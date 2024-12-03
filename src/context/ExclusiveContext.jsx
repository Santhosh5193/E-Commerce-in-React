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
  const [checkWishList, setCheckWishList] = useState(false);
  const [wishlistChange, setWishlistChagne] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [seachCategory, setSeachCategory] = useState("");

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
          console.log("No Cartlist found for this user.");
        }

        // Fetch Wishlist
        const wishlistRef = doc(db, "Wishlist", userId);
        const wishlistDoc = await getDoc(wishlistRef);
        if (wishlistDoc.exists()) {
          const existingWishlistProducts = wishlistDoc.data().products || [];
          setWishlistProducts(existingWishlistProducts);
        } else {
          console.log("No Wishlist found for this user.");
        }
      } catch (error) {
        console.error("Error fetching lists data:", error.message);
      }
    };

    fetchCartStatus();
  }, [auth.currentUser?.uid, productData, checkCartList, wishlistProductIds]);

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
      }}
    >
      {children}
    </ExclusiveContext.Provider>
  );
};

export default ExclusiveContext;
