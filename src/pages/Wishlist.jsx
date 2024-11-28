import gamepad from "./../assets/FlashSales/images/gamepad.svg";
import deleteicon from "../assets/icons/Deleteicon.svg";
import Carticon from "../assets/icons/Cartlisticon1.svg";
import { useContext, useEffect, useState } from "react";
import ExclusiveContext from "../context/ExclusiveContext";
import Star from "../assets/FlashSales/images/star.svg";
import wishlisticon1 from "../assets/icons/Wishlist.svg";
import { Link } from "react-router-dom";
import Viewicon from "../assets/svg/Viewicon";
import { auth, db } from "../../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Emptywishlist from "../assets/images/Emptywishlist.png";

function Wishlist() {
  const {
    wishlistProducts,
    setWishlistProducts,
    productData,
    userId,
    setProductView,
    cartlistProducts,
    setCartlistProducts,
    checkCartList,
    setCheckCartList,
  } = useContext(ExclusiveContext);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  // Delete item from Wishlist
  const handleDeleteInWishList = async (productId) => {
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    const product = wishlistProducts.find((item) => item.id === productId);
    if (!product) {
      console.error("Product not found");
      return;
    }
    const wishlistRef = doc(db, "Wishlist", userId);

    try {
      const wishlistDoc = await getDoc(wishlistRef);

      if (wishlistDoc.exists()) {
        const existingWishlistProducts = wishlistDoc.data().products || [];
        const isProductInWishlist = existingWishlistProducts.some(
          (item) => item.productId === productId
        );

        if (isProductInWishlist) {
          const updatedProducts = existingWishlistProducts.filter(
            (item) => item.productId !== productId
          );
          await updateDoc(wishlistRef, { products: updatedProducts });
          toast.success(`Product removed from Wishlist`);
          setWishlistProducts((prev) =>
            prev.filter((item) => item.id !== productId)
          );
        }
      }
    } catch (error) {
      console.error(`Error to Delete}:`, error.message);
    }
  };

  //Product item to view
  const handleToViewlist = (id) => {
    setProductView(id);
  };

  // Add or Remove Items from Wishlist or Cart
  const handleAddToList = async (productId) => {
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    const product = productData.find((item) => item.id === productId);
    if (!product) {
      console.error("Product not found");
      return;
    }

    const listRef = doc(db, "Cartlist", userId);

    try {
      const listDoc = await getDoc(listRef);

      if (listDoc.exists()) {
        const existingProducts = listDoc.data().products || [];
        const isProductInList = existingProducts.some(
          (item) => item.productId === productId
        );

        if (!isProductInList) {
          // Add product if it doesn't already exist in the cart
          await updateDoc(listRef, {
            products: arrayUnion({ productId, ...product }),
          });
          toast.success("Product added to cart");
          setCartlistProducts((prev) => [...prev, { productId, ...product }]);
          setCheckCartList(true);
        } else {
          console.log("Product is already in the cart");
          setCheckCartList(true);
        }
      } else {
        // Create a new cart and add the product
        await setDoc(listRef, {
          products: [{ productId, ...product }],
        });
        console.log("New cart created and product added");
        setCartlistProducts((prev) => [...prev, { productId, ...product }]);
        setCheckCartList(true);
      }
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

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

  return (
    <section className="py-10 md:px-14 px-5">
      <header>
        <h2 className="PoppinsFont mb-10 px-5">
          <Link to="/"> Home</Link> /{" "}
          <span className="font-medium">Wishlist</span>
        </h2>
      </header>
      <div className=" py-10 px-14 ">
        <div className="flex mb-10 justify-between PoppinsFont">
          {wishlistProducts.length !== 0 && (
            <div className="">
              <p className="font-normal text-lg">
                Wishlist (<span>{wishlistProducts.length}</span>)
              </p>
            </div>
          )}
          {/* {wishlistProducts.length !== 0 && (
            <div className=" border-2 rounded font-medium  text-base">
              <button className="px-4 py-2">Move All To Bag</button>
            </div>
          )} */}
        </div>
        {wishlistProducts.length !== 0 ? (
          <div className="cards pb-5 flex justify-center items-start flex-wrap gap-10 ">
            {wishlistProducts.map((product) => (
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
                        <h2 className="text-red-500">₹{product.price}</h2>
                        <h2 className="line-through">
                          ₹{product.originalPrice}
                        </h2>
                        <div className="w-9 h-9 absolute  bg-white top-3 right-3 rounded-full cursor-pointer  flex justify-center items-center">
                          <img
                            src={deleteicon}
                            alt=""
                            onClick={() => handleDeleteInWishList(product.id)}
                          />
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
        ) : (
          <div
            className="flex flex-col justify-center items-center h-[50vh]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px" }}
          >
            <img src={Emptywishlist} alt="" className="h-[162px] w-[221px]" />
            <p className="text-lg pt-12">Your wishlist is MT!</p>
            <p className="pt-5 text-gray-500">
              Explore our wide selection and find something you like
            </p>
          </div>
        )}
        <ToastContainer autoClose={2000} />
      </div>
    </section>
  );
}

export default Wishlist;
