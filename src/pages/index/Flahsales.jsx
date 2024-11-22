import rightArrow from "../../assets/FlashSales/images/Arrowright.svg";
import leftArrow from "../../assets/FlashSales/images/Arrowleft.svg";
import Star from "../../assets/FlashSales/images/star.svg";
import Wishlisticon from "../../assets/svg/Wishlisticon";
import Viewicon from "../../assets/svg/Viewicon";
import Carticon from "../../assets/icons/Wishlisticon1.svg";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import {
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../../firebase";
import ExclusiveContext from "../../context/ExclusiveContext";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { set, ref } from "firebase/database";

function Flahsales() {
  const {
    setProductView,
    timeLeft,
    productData,
    // cartlistProducts,
    // setCartlistProducts,
  } = useContext(ExclusiveContext);
  const auth = getAuth();
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [checkCartList, setCheckCartList] = useState(false);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [cartlistProducts, setCartlistProducts] = useState([]);
  const [isProductInCart, setIsProductInCart] = useState(false);

  // useEffect(() => {
  //   if (hoveredProductId !== null) {
  //     const isInCart = cartlistProducts.includes(hoveredProductId);
  //     setIsProductInCart(isInCart);
  //   }
  // }, [hoveredProductId, cartlistProducts]);

  const handleCartHover = (id) => {
    const isproductInCartlist = cartlistProducts.some(
      (cartlistProducts) => cartlistProducts === id
    );
    setHoveredProductId(id);
    if (isproductInCartlist) {
      setCheckCartList(true);
    } else {
      setCheckCartList(false);
    }
  };

  const handleCartHoverLeave = () => {
    setHoveredProductId(null);
  };

  //Scrolling section
  const cardsRef = useRef(null);
  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const scrollRight = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };
  const handleToViewlist = (id) => {
    setProductView(id);
  };

  // create a Cartlist
  const createListsForUser = async (userId) => {
    const cartReference = doc(db, "Cartlist", userId);
    const wishlistReference = doc(db, "Wishtlist", userId);

    try {
      const cartlistDoc = await getDoc(cartReference);
      let cartlistProductIds = [];
      if (cartlistDoc.exists()) {
        const cartlistData = cartlistDoc.data();
        const cartlistProducts = cartlistData.products || [];
        cartlistProductIds = cartlistProducts.map((item) => item.id);
      }
      //  else {
      //   console.log("No cartlist is founded for the user");
      // }

      const wishlistDoc = await getDoc(wishlistReference);
      let wishlistProductIds = [];
      if (wishlistDoc.exists()) {
        const wishlistData = wishlistDoc.data();
        const wishlistProducts = wishlistData.products || [];
        wishlistProductIds = wishlistProducts.map((item) => item.id);
      }
      //  else {
      //   console.log("No wishlist found for this user.");
      // }

      // console.log("Product IDs:", productIds);
      setWishlistProducts(wishlistProductIds);
      setCartlistProducts(cartlistProductIds);

      return { cartlistProductIds, wishlistProductIds };
    } catch (error) {
      console.error("Error fetching wishlist:", error.message);
      return { cartProductIds: [], wishlistProductIds: [] };
    }
  };

  useEffect(() => {
    const checkAuthAndFetchLists = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          createListsForUser(user.uid);
        } else {
          console.log("User is not signed in");
        }
      });
    };

    checkAuthAndFetchLists();
  }, [auth]);

  // Add Items to Cart
  const handleAddToList = async (productId, isWishlist = false) => {
    const userId = auth.currentUser?.uid;
    // const cartRef = ref(db, `Cartlist/${productId}`);
    // set(cartRef, true).then(() => {
    //   console.log("Product added to cart");
    // });
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    const product = productData.find((item) => item.id === productId);
    if (!product) {
      console.error("Product not found");
      return;
    }

    const listRef = doc(db, isWishlist ? "Wishlist" : "Cartlist", userId);
    try {
      const listDoc = await getDoc(listRef);

      if (listDoc.exists()) {
        const existingProducts = listDoc.data().products || [];
        const isProductInList = existingProducts.some(
          (item) => item.productId === productId
        );

        if (isProductInList) {
          console.log("Product already in the cart");
        } else {
          await updateDoc(listRef, {
            products: arrayUnion({ productId, ...product }),
          });
          console.log("Product added to existing cart");
          setCheckCartList(true);

          if (isWishlist) {
            setWishlistProducts((prev) => [...prev, productId]);
          } else {
            setCartlistProducts((prev) => [...prev, productId]);
            setCheckCartList(true);
          }
        }
      } else {
        await setDoc(listRef, {
          products: [{ productId, ...product }],
        });
        console.log("New cart created and product added");

        if (isWishlist) {
          setWishlistProducts((prev) => [...prev, productId]);
        } else {
          setCartlistProducts((prev) => [...prev, productId]);
          setCheckCartList(true);
        }
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };
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
          setCartlistProducts(existingCartProducts);
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
  }, [auth.currentUser?.uid, productData]);

  // Fetch cartlist data from firebase
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Cartlist"));
        const Cartlistproducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(Cartlistproducts);

        setCartlistProducts(Cartlistproducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className="border-b-2 py-8">
      <div className="head flex gap-3 items-center pb-5">
        <div className="h-10 w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Today's</h3>
      </div>
      <div className="flex justify-between">
        <div className="crad-head flex sm: pb-5 flex-col sm:flex-row  lg:gap-x-[89px] md:gap-x-[50px] gap-x-[15px] space-y-2">
          <div className="Title InterFont md:text-4xl text-2xl font-medium text-nowrap">
            <h3>Flash Sales</h3>
          </div>
          <div className="Timer flex items-center  sm:space-x-5 space-x-2">
            <div className="days">
              <p className="PoppinsFont sm:text-xs text-[10px]">Days</p>
              <div className="flex lg:space-x-5 space-x-3 ">
                <h2 className="InterFont font-bold lg:text-[32px] sm:text-[28px]">
                  {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                </h2>
                <p className="sm:text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Hours">
              <p className="PoppinsFont sm:text-xs text-[10px]">Hours</p>
              <div className="flex lg:space-x-5 space-x-3">
                <span className="InterFont font-bold lg:text-[32px] sm:text-[28px]">
                  {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
                </span>
                <p className="sm:text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Minutes">
              <p className="PoppinsFont sm:text-xs text-[10px]">Minutes</p>
              <div className="flex lg:space-x-5 space-x-3">
                <span className="InterFont font-bold lg:text-[32px] sm:text-[28px]">
                  {timeLeft.minutes < 10
                    ? `0${timeLeft.minutes}`
                    : timeLeft.minutes}
                </span>
                <p className="sm:text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Seconds">
              <p className="PoppinsFont sm:text-xs text-[10px]">Seconds</p>
              <span className="InterFont font-bold lg:text-[32px] sm:text-[28px]">
                {timeLeft.seconds < 10
                  ? `0${timeLeft.seconds}`
                  : timeLeft.seconds}
              </span>
            </div>
          </div>
        </div>
        <div className="arrows flex gap-3 ">
          <div
            className="bg-gray-200 sm:w-9 sm:h-9 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={scrollLeft}
          >
            <div className="sm:w-8 sm:h-8 w-5 h-5 flex justify-center items-center">
              <img src={leftArrow} alt="" className="w-5 sm:w-full" />
            </div>
          </div>
          <div
            className="bg-gray-200 sm:w-9 sm:h-9 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={scrollRight}
          >
            <div className="sm:w-8 sm:h-8 w-5 h-5 flex justify-center items-center">
              <img src={rightArrow} alt="" className="w-5 sm:w-full" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="cards pb-5 flex overflow-x-auto space-x-5 "
        ref={cardsRef}
        style={{ scrollbarWidth: "none" }}
      >
        {productData
          ?.filter((product) => product.type === "flashsales")
          .map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => handleCartHover(product.id)}
              onMouseLeave={handleCartHoverLeave}
            >
              <div className=" card-1 relative w-[270px]  rounded-md border-2">
                <div className="card-head relative h-[270px] flex flex-col justify-center items-center border-b-2">
                  <img
                    src={product.image[0]}
                    alt=""
                    tabIndex="0"
                    className="w-[80%] h-[70%] object-contain cursor-pointer"
                  />
                  <button
                    className={`w-full absolute bottom-0 flex justify-center gap-3 py-2  bg-black text-white transition-all duration-300 ${
                      hoveredProductId === product.id
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    } `}
                  >
                    <img src={Carticon} alt="" />
                    {hoveredProductId === product.id && ? (
                      <p onClick={() => handleAddToList(product.id, false)}>
                        Add to Cart
                      </p>
                    ) : (
                      <Link to="/cart">
                        <p>Go to Cart</p>
                      </Link>
                    )}
                  </button>
                </div>
                <div className="card-body p-2">
                  <div className="">
                    <h2 className="font-medium inline-block w-[230px] truncate">
                      {product.productName}
                    </h2>
                    <div className="rate flex gap-3">
                      <h2 className="text-red-500">₹{product.price}</h2>
                      <h2 className="line-through">₹{product.originalPrice}</h2>
                      <div className="absolute  bg-white top-3 right-3 rounded-full">
                        <div
                          className="w-9 h-9 flex justify-center items-center cursor-pointer text-red-500 "
                          onClick={() => handleAddToList(product.id, true)}
                        >
                          {/* <img
                            src={wishlisthearticon}
                            alt="wishlisthearticon"
                            className=""
                          /> */}
                          {wishlistProducts.includes(product.id) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="wishlist-icon w-6 h-6"
                            >
                              <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="currentColor"
                              />
                            </svg>
                          ) : (
                            <p>i</p>
                          )}
                        </div>
                      </div>
                      <div className="absolute  bg-white top-14 right-3 rounded-full">
                        <div
                          className="w-9 h-9 flex justify-center items-center cursor-pointer"
                          id={product.id}
                          onClick={() => handleToViewlist(product.id)}
                        >
                          <Link to="/productview">
                            <Viewicon />
                          </Link>
                        </div>
                      </div>
                      <div className="absolute bg-secondary text-white top-2 left-2 rounded-md px-3 py-1">
                        <div className="flex justify-center items-center ">
                          <p className="tracking-wider text-sm">
                            {product.offer}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="star flex gap-2 py-1">
                      {product?.ratings.map((star) => (
                        <img src={Star} key={star} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className=" flex justify-center">
        <Link to="/products">
          <button className=" PoppinsFont bg-secondary py-2 rounded-md  w-[230px] text-white text-base">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Flahsales;
