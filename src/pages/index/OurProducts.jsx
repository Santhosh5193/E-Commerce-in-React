import rightArrow from "../../assets/FlashSales/images/Arrowright.svg";
import leftArrow from "../../assets/FlashSales/images/Arrowleft.svg";
import Star from "../../assets/FlashSales/images/star.svg";
import Viewicon from "../../assets/svg/Viewicon";
import Carticon from "../../assets/icons/Cartlisticon1.svg";
import wishlisticon1 from "../../assets/icons/Wishlist.svg";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";
import { getDoc, setDoc, updateDoc, arrayUnion, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import ExclusiveContext from "../../context/ExclusiveContext";
import { getAuth } from "@firebase/auth";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function OurProducts() {
  const {
    setProductView,
    productData,
    userId,
    cartlistProducts,
    setCartlistProducts,
    setWishlistProducts,
    checkCartList,
    setCheckCartList,
    wishlistProductIds,
  } = useContext(ExclusiveContext);
  const auth = getAuth();
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    if (!userId) {
      setCartlistProducts([]);
    }
  }, [userId]);

  // Handle cart products Hover
  const handleCartHover = (id) => {
    setHoveredProductId(id);
  };

  useEffect(() => {
    const isproductInCartlist = cartlistProducts.some(
      (cartlistProducts) => cartlistProducts.id === hoveredProductId
    );

    if (isproductInCartlist) {
      setCheckCartList(true);
    } else {
      setCheckCartList(false);
    }
  }, [hoveredProductId]);

  const handleCartHoverLeave = () => {
    setHoveredProductId(null);
  };

  //Scrolling section
  const cardsRef = useRef(null);
  const getSizeToScroll = () => {
    return window.innerWidth <= 768 ? 270 : 300;
  };

  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({
        left: -getSizeToScroll(),
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({
        left: getSizeToScroll(),
        behavior: "smooth",
      });
    }
  };

  //Product item to view
  const handleToViewlist = (id) => {
    setProductView(id);
  };

  // Add or Remove Items from Wishlist or Cart
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
    <div className="border-b-2 py-8">
      <div className="head flex gap-3 items-center sm:pb-5 pb-3">
        <div className="sm:h-10 h-7 w-2 sm:w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Our Products</h3>
      </div>
      <div className="flex justify-between">
        <div className="crad-head flex sm: pb-5 flex-col sm:flex-row  lg:gap-x-[89px] md:gap-x-[50px] gap-x-[15px] space-y-2">
          <div className="Title InterFont md:text-4xl sm:text-2xl font-medium text-nowrap">
            <h3>Explore Our Products</h3>
          </div>
        </div>
        <div className="arrows flex gap-3 ">
          <div
            className="bg-gray-200 sm:w-9 sm:h-9 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={scrollLeft}
          >
            <div className="sm:w-8 sm:h-8 w-5 h-5 flex justify-center items-center">
              <img src={leftArrow} alt="leftArrow" className="w-5 sm:w-full" />
            </div>
          </div>
          <div
            className="bg-gray-200 sm:w-9 sm:h-9 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={scrollRight}
          >
            <div className="sm:w-8 sm:h-8 w-5 h-5 flex justify-center items-center">
              <img
                src={rightArrow}
                alt="rightArrow"
                className="w-5 sm:w-full"
              />
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
          ?.filter((product) => product.type === "Explore-Products")
          .map((product) => (
            <div
              key={product.id}
              onMouseEnter={() => handleCartHover(product.id)}
              onMouseLeave={handleCartHoverLeave}
            >
              <div className=" card-1 relative sm:w-[270px]  rounded-md border-2">
                <div className="card-head relative h-[230px] sm:h-[270px] flex flex-col justify-center items-center border-b-2">
                  <img
                    src={product.image[0]}
                    alt=""
                    tabIndex="0"
                    className="sm:w-[80%] sm:h-[70%] w-[60%] h-[60%] object-contain cursor-pointer"
                  />
                  <button
                    className={`w-full absolute bottom-0 flex justify-center gap-3 py-2  bg-black text-white transition-all duration-300 ${
                      hoveredProductId === product.id
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                    } `}
                  >
                    <img src={Carticon} alt="" />
                    {checkCartList ? (
                      <Link to="/cart">
                        <p>Go to Cart</p>
                      </Link>
                    ) : (
                      <p onClick={() => handleAddToList(product.id, false)}>
                        Add to Cart
                      </p>
                    )}
                  </button>
                </div>
                <div className="card-body p-2">
                  <div className="">
                    <h2 className="font-medium inline-block w-[230px] truncate">
                      {product.productName}
                    </h2>
                    <div className="rate flex gap-3">
                      <h2 className="text-red-700">₹{product.price}</h2>
                      <h2 className="line-through">₹{product.originalPrice}</h2>
                      <div className="absolute  bg-white top-3 right-3 rounded-full">
                        <div className="w-9 h-9 flex justify-center items-center cursor-pointer text-red-500 ">
                          {wishlistProductIds.includes(product.id) ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              className="wishlist-icon w-6 h-6"
                              onClick={() => handleAddToList(product.id, true)}
                            >
                              <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="currentColor"
                              />
                            </svg>
                          ) : (
                            <img
                              src={wishlisticon1}
                              alt={"wishlisticons"}
                              onClick={() => handleAddToList(product.id, true)}
                            />
                          )}
                        </div>
                      </div>
                      <div className="absolute  bg-white top-14 right-3 rounded-full">
                        <div
                          className="w-9 h-9 flex justify-center items-center cursor-pointer"
                          id={product.id}
                          onClick={() => handleToViewlist(product.id)}
                        >
                          <Link
                            to="/productview"
                            aria-label="View product details"
                          >
                            <Viewicon />
                          </Link>
                        </div>
                      </div>
                      <div className="absolute bg-secondary text-gray-100 top-2 left-2 rounded-md px-3 py-1">
                        <div className="flex justify-center items-center ">
                          <p className="tracking-wider text-sm drop-shadow-md">
                            {product.offer}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="star flex gap-2 py-1">
                      {product?.ratings.map((star, index) => (
                        <img src={Star} key={star} alt={index} />
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
          <button className="PoppinsFont bg-secondary py-2 rounded-md w-[150px] sm:w-[230px] text-white sm:text-base text-sm">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OurProducts;
