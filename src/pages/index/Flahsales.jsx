import rightArrow from "../../assets/FlashSales/images/Arrowright.svg";
import leftArrow from "../../assets/FlashSales/images/Arrowleft.svg";
import Star from "../../assets/FlashSales/images/star.svg";
import Wishlisticon from "../../assets/svg/Wishlisticon";
import Viewicon from "../../assets/svg/Viewicon";
import Wishlistcarticon from "../../assets/icons/Wishlisticon1.svg";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import {
  collection,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import ExclusiveContext from "../../context/ExclusiveContext";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

function Flahsales() {
  const {
    setProductView,
    timeLeft,
    productData,
    cartlistProducts,
    setCartlistProducts,
  } = useContext(ExclusiveContext);
  const auth = getAuth();
  const [hoveredProductId, setHoveredProductId] = useState(null);
  // const [cartlistProducts, setCartlistProducts] = useState([]);
  const [chechCartList, setCheckCartList] = useState(false);

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

  const handleWishlist = (id) => {
    setProductView(id);
  };

  // create a Cartlist
  const createCartForUser = async (userId) => {
    const wishlistRef = doc(db, "Cartlist", userId); // Reference to the user's wishlist

    try {
      const wishlistDoc = await getDoc(wishlistRef);

      if (wishlistDoc.exists()) {
        const wishlistData = wishlistDoc.data(); // Get the document data
        const productList = wishlistData.products || []; // Get the 'products' array (default to empty array if not present)

        // Extract the IDs of items in the 'products' array
        const productIds = productList.map((item) => item.id); // Assuming each product has an 'id' field

        // console.log("Product IDs:", productIds);
        setCartlistProducts(productIds);
        return productIds; // Return the array of product IDs
      } else {
        console.log("No wishlist found for this user.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error.message);
      return [];
    }
  };

  useEffect(() => {
    const checkAuthAndCreateCart = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          createCartForUser(user.uid);
        } else {
          console.log("User is not signed in");
        }
      });
    };

    checkAuthAndCreateCart();
  }, [auth]);

  // Add Items to Cart
  const handleAddToCart = async (productId) => {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    const product = productData.find((item) => item.id === productId);
    if (!product) {
      console.error("Product not found");
      return;
    }

    const cartRef = doc(db, "Cartlist", userId);
    try {
      const cartDoc = await getDoc(cartRef);
      if (cartDoc.exists()) {
        const existingProducts = cartDoc.data().products || [];
        const isProductInCart = existingProducts.some(
          (item) => item.productId === productId
        );

        if (isProductInCart) {
          console.log("Product already in the cart");
        } else {
          await updateDoc(cartRef, {
            products: arrayUnion({ productId, ...product }),
          });
          console.log("Product added to existing cart");
          setCartlistProducts((prev) => [...prev, productId]);
        }
      } else {
        await setDoc(cartRef, {
          products: [{ productId, ...product }],
        });
        console.log("New cart created and product added");
        setCartlistProducts((prev) => [...prev, productId]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };
  useEffect(() => {
    const fetchCartStatus = async () => {
      const userId = auth.currentUser?.uid;
      if (!userId) return;

      const cartRef = doc(db, "Cartlist", userId);
      try {
        const cartDoc = await getDoc(cartRef);
        if (cartDoc.exists()) {
          const existingProducts = cartDoc.data().products || [];
          const isProductInCart = existingProducts.some(
            (item) => item.productId === productData.id
          );
          setCheckCartList(isProductInCart);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error.message);
      }
    };

    fetchCartStatus();
  }, [productData.id]);

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
        className="cards pb-5 flex overflow-x-auto space-x-5"
        ref={cardsRef}
        style={{ scrollbarWidth: "none" }}
      >
        {productData
          .filter((product) => product.type === "flashsales")
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
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <img src={Wishlistcarticon} alt="" />
                    {cartlistProducts.includes(product.id) ? (
                      <Link to="/cart">
                        <p>Go to Cart</p>
                      </Link>
                    ) : (
                      <p>Add to Cart</p>
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
                        <div className="w-9 h-9 flex justify-center items-center ">
                          <Wishlisticon />
                        </div>
                      </div>
                      <div className="absolute  bg-white top-14 right-3 rounded-full">
                        <div
                          className="w-9 h-9 flex justify-center items-center cursor-pointer"
                          id={product.id}
                          onClick={() => handleWishlist(product.id)}
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
