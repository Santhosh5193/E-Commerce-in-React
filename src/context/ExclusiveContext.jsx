import { createContext, useEffect, useRef, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { db } from "../../firebase";
import {
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ExclusiveContext = createContext();

export const ContextProvider = ({ children }) => {
  const [productView, setProductView] = useState("");
  const [productData, setProductData] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [setIncrement, isSetIncrement] = useState(1);
  const [userId, setUserId] = useState(null);
  const auth = getAuth();
  const [timeLeft, setTimeLeft] = useState({});
  const [cartlistProducts, setCartlistProducts] = useState([]);
  const [checkCartList, setCheckCartList] = useState(false);
  const [wishlistProductIds, setWishlistProductsIds] = useState([]);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [wishlistChange, setWishlistChagne] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [seachCategory, setSeachCategory] = useState("");
  const [userlist, setUserList] = useState([]);

  // Fetch and set the user ID when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId("");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Count down
  useEffect(() => {
    const endTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

    const calculateTimeLeft = () => {
      const currentTime = new Date().getTime();
      const difference = endTime - currentTime;

      setTimeLeft((prevTime) => {
        const newTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
        return JSON.stringify(prevTime) === JSON.stringify(newTime)
          ? prevTime
          : newTime;
      });
    };

    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  //Fetch data from firebase
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(products);
        setProductData(products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  // Fetch data from cartlist and wishlist
  useEffect(() => {
    const fetchCartStatus = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      try {
        // Fetch Cartlist
        const cartRef = doc(db, "Cartlist", userId);
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
          const existingCartProducts = cartDoc.data().products || [];
          setCartlistProducts((prev) => {
            if (JSON.stringify(prev) !== JSON.stringify(existingCartProducts)) {
              return existingCartProducts;
            }
            return prev;
          });
        } else {
          // console.log("No Cartlist found for this user.");
        }

        // // Fetch Wishlist
        const wishlistRef = doc(db, "Wishlist", userId);
        const wishlistDoc = await getDoc(wishlistRef);
        if (wishlistDoc.exists()) {
          const existingWishlistProducts = wishlistDoc.data().products || [];
          setWishlistProducts(existingWishlistProducts);
        } else {
          // console.log("No Wishlist found for this user.");
        }
      } catch (error) {
        console.error("Error fetching lists data:", error.message);
      }
    };

    fetchCartStatus();
  }, [auth.currentUser?.uid, productData]);
  // }, [auth.currentUser?.uid, productData, checkCartList]);

  useEffect(() => {
    const productIds = wishlistProducts.map((i) => i.id);
    setWishlistProductsIds(productIds);
  }, [wishlistProducts]);

  // Calculating SubTotal and Final Total
  useEffect(() => {
    const subTotalPrice = cartlistProducts.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubTotalPrice(subTotalPrice.toFixed(2));
  }, [cartlistProducts]);

  const shippingCost = cartlistProducts.length * 20;
  const totalPrice = Number(subTotalPrice) + Number(shippingCost);

  //Fetching User list
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserList(products);
        } catch (error) {
          console.error("Error fetching users data:", error);
        }
      }
    };
    fetchUserDetails();
  }, [userId]);

  const handleAddToList = async (productId, isWishlist = false) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.log("User not logged in");
      Swal.fire({
        title: "User not logged in",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login",
        customClass: {
          confirmButton: "custom-login-button",
          cancelButton: "custom-login-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }

    const product = productData.find((item) => item.id === productId);

    if (!product) {
      console.error("Product not found");
      return;
    }

    const collectionName = isWishlist ? "Wishlist" : "Cartlist";
    const listRef = doc(db, collectionName, userId);

    try {
      const listDoc = await getDoc(listRef);

      if (listDoc.exists()) {
        const existingProducts = listDoc.data().products || [];
        const isProductInList = existingProducts.some(
          (item) => item.productId === productId
        );

        if (isProductInList) {
          // Remove the product if it's already in the list
          const updatedProducts = existingProducts.filter(
            (item) => item.productId !== productId
          );

          // Update the corresponding state
          if (isWishlist) {
            await updateDoc(listRef, { products: updatedProducts });
            toast.success(
              `Product removed from ${collectionName.toLowerCase()}`
            );
            setWishlistProducts(updatedProducts);
          }
        } else {
          await updateDoc(listRef, {
            products: arrayUnion({ productId, ...product }),
          });
          toast.success(`Product added to ${collectionName.toLowerCase()}`);

          if (isWishlist) {
            setWishlistProducts((prev) => [...prev, product]);
          } else {
            setCartlistProducts((prev) => [...prev, product]);
            setCheckCartList(true);
          }
        }
      } else {
        await setDoc(listRef, {
          products: [{ productId, ...product }],
        });
        toast.success(
          `New ${collectionName.toLowerCase()} created and product added`
        );

        // Update the corresponding state
        if (isWishlist) {
          setWishlistProducts((prev) => [...prev, productId]);
        } else {
          setCartlistProducts((prev) => [...prev, productId]);
          setCheckCartList(true);
        }
      }
    } catch (error) {
      console.error(
        `Error updating ${collectionName.toLowerCase()}:`,
        error.message
      );
    }
  };

  return (
    <ExclusiveContext.Provider
      value={{
        productView,
        setProductView,
        userId,
        setUserId,
        timeLeft,
        setProductView,
        productData,
        setIncrement,
        isSetIncrement,
        cartlistProducts,
        setCartlistProducts,
        wishlistProducts,
        setWishlistProducts,
        checkCartList,
        setCheckCartList,
        wishlistProductIds,
        setWishlistProductsIds,
        subTotalPrice,
        shippingCost,
        totalPrice,
        setWishlistChagne,
        filteredProducts,
        setFilteredProducts,
        seachCategory,
        setSeachCategory,
        userlist,
        setUserList,
        handleAddToList,
      }}
    >
      {children}
    </ExclusiveContext.Provider>
  );
};

export default ExclusiveContext;
