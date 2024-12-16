import Star from "../assets/FlashSales/images/star.svg";
import Quantity from "../components/Quantity";
import { Link, useParams } from "react-router-dom";
import Wishlisticon from "../assets/icons/Wishlist.svg";
import { useEffect, useState } from "react";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useContext } from "react";
import ExclusiveContext from "../context/ExclusiveContext";
import wishlisticon1 from "../assets/icons/Wishlist.svg";
import Carticon from "../assets/icons/Cartlisticon1.svg";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

function ProductView() {
  const {
    productView,
    setProductView,
    wishlistProductIds,
    setCartlistProducts,
    setWishlistProducts,
    cartlistProducts,
    checkCartList,
    userId,
  } = useContext(ExclusiveContext);
  const a = ["XS", "S", "M", "L", "XL"];
  const [productData, setProductData] = useState([]);
  const [hoveredImage, setHoveredImage] = useState("");
  const [clickImage, setClickImage] = useState("");

  useEffect(() => {
    if (productView) {
      localStorage.setItem("productView", productView);
    }
  }, [productView]);

  useEffect(() => {
    const savedProductView = localStorage.getItem("productView");

    if (savedProductView) {
      setProductView(savedProductView);

      const fetchProductData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "Products"));
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProductData(products);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };

      fetchProductData();
    }
  }, []);

  const handleCartHover = (image) => {
    setHoveredImage(image);
  };

  const handleCartNotHover = () => {
    setHoveredImage("");
  };

  const handleCartClick = (image) => {
    setClickImage(image);
  };

  // Add or Remove Items from Wishlist or Cart
  const handleAddToList = async (productId, isWishlist = false) => {
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
    <section className="sm:py-10 md:px-16 sm:px-10 px-7 py-5">
      <div className="">
        <header>
          <h2 className="PoppinsFont sm:mb-10 mb-5">
            <Link to="/home">Home</Link> / Flashsales /
            <span className="font-medium">Product view </span>
          </h2>
        </header>
      </div>

      {productData
        .filter((item) => productView === item.id)
        .map((item) => (
          <div
            key={item.id}
            className="w-full flex md:flex-row flex-col space-y-5 md:space-y-0  md:space-x-5"
          >
            <div className="flex flex-col md:w-1/2 justify-center items-center space-y-5">
              <div className="flex items-center justify-center md:h-[350px] h-[300px] w-[80%] bg-white border-2 p-3 relative">
                <img
                  src={hoveredImage || clickImage || item.image[0]}
                  alt="Product image"
                  className="w-[80%] h-[80%] object-contain"
                />
                <div className="absolute  bg-white top-3 right-3 rounded-full">
                  <div className="w-9 h-9 flex justify-center items-center cursor-pointer text-red-500 ">
                    {wishlistProductIds.includes(item.id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="wishlist-icon w-6 h-6"
                        onClick={() => handleAddToList(item.id, true)}
                      >
                        <path
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <img
                        src={wishlisticon1}
                        alt="wishlisticon1"
                        onClick={() => handleAddToList(item.id, true)}
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-5 justify-between ">
                {item.image.map((i, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => handleCartHover(i)}
                    onMouseLeave={handleCartNotHover}
                    onClick={() => handleCartClick(i)}
                    className="w-30 h-30  md:w-20 md:h-20 lg:w-28 lg:h-28 flex items-center justify-center  border-2 p-3 cursor-pointer"
                  >
                    <img
                      src={i}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex md:w-1/2">
              <div className="">
                <h2 className="InterFont sm:text-2xl  font-semibold">
                  {item.productName}
                </h2>
                <div className="flex justify-start flex-wrap sm:space-x-5 space-x-2 items-center py-2">
                  <div className="star flex gap-2 py-1">
                    {item.ratings.map((_, index) => (
                      <img
                        key={index}
                        src={Star}
                        alt=""
                        className="sm:w-[20px] sm:h-[20px] "
                      />
                    ))}
                  </div>
                  <p className="PoppinsFont text-gray-300 sm:pr-4 pr-2 border-r-2 text-sm">
                    (150 Reviews)
                  </p>

                  {/* In Stock */}
                  {item.stockLeft > 0 ? (
                    <p className="PoppinsFont text-green-500 font-semibold">
                      In stock
                    </p>
                  ) : (
                    <p className="PoppinsFont text-red-500 font-semibold">
                      Out of Stock
                    </p>
                  )}
                </div>
                <div className="flex gap-5 ">
                  <p className="InterFont text-[24px] mb-2 line-through">
                    ₹{item.originalPrice}
                  </p>
                  <div className="flex items-center gap-2">
                    <h2 className="InterFont text-[24px] mb-2 text-red-500">
                      ₹{item.price}
                    </h2>
                    <p className="InterFont text-base mb-2 text-red-500">
                      ({item.offer})
                    </p>
                  </div>
                </div>
                <p className="PoppinsFont pb-4  border-b-2 text-sm sm:text-base">
                  {item.description}
                </p>
                <div className="mt-5 flex items-center space-x-8">
                  {/* <div className="">
                    <Quantity />
                  </div> */}
                  {/* <div
                    className="rounded py-[2px] px-5 text-center text-nowrap "
                    style={{ background: "#DB4444", color: "white" }}
                  >
                    <button type="submit">
                      <Link to="/cart/checkout">Add to cart</Link>
                    </button>
                  </div> */}

                  <div className="">
                    <button
                      className={`w-full flex justify-center px-3 rounded-sm py-2  bg-black text-white transition-all duration-300 `}
                    >
                      <img src={Carticon} alt="Carticon" />
                      {checkCartList ? (
                        <Link to="/cart">
                          <p>Go to Cart</p>
                        </Link>
                      ) : (
                        <p onClick={() => handleAddToList(item.id, false)}>
                          Add to Cart
                        </p>
                      )}
                    </button>
                  </div>
                  {/* </div> */}
                  {/* <div className="w-7 h-7 border-2 rounded-md items-center flex justify-center">
                    <img src={Wishlisticon} alt="" className="w-4 " />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}

export default ProductView;
