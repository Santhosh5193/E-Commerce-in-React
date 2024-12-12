import { toast, ToastContainer } from "react-toastify";
import ExclusiveContext from "../context/ExclusiveContext";
import { useContext, useEffect, useState } from "react";
import Carticon from "../assets/icons/Cartlisticon1.svg";
import wishlisticon1 from "../assets/icons/Wishlist.svg";
import Viewicon from "../assets/svg/Viewicon";
import Star from "./../assets/FlashSales/images/star.svg";

import { Link, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

function SeachList() {
  const {
    setWishlistProducts,
    productData,
    userId,
    setProductView,
    cartlistProducts,
    setCartlistProducts,
    checkCartList,
    setCheckCartList,
    wishlistProductIds,
    setWishlistProductsIds,
    filteredProducts,
    seachCategory,
  } = useContext(ExclusiveContext);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const navigate = useNavigate();

  //Product item to view
  const handleToViewlist = (id) => {
    setProductView(id);
  };

  const handleAddToList = async (productId, isWishlist = false) => {
    if (!userId) {
      console.log("User not logged in");
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

            setWishlistProducts((prev) =>
              prev.filter((id) => id !== productId)
            );
            setWishlistProductsIds((prev) =>
              prev.filter((id) => id !== productId)
            );
          }
        } else {
          await updateDoc(listRef, {
            products: arrayUnion({ productId, ...product }),
          });
          toast.success(`Product added to ${collectionName.toLowerCase()}`);

          if (isWishlist) {
            setWishlistProducts((prev) => [...prev, productId]);
            setWishlistProductsIds((prev) => [...prev, productId]);
          } else {
            setCartlistProducts((prev) => [...prev, productId]);
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
          setWishlistProductsIds((prev) => [...prev, productId]);
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
    <div className=" py-10 px-14">
      <div className="cards pb-5 flex justify-center items-start flex-wrap gap-10 ">
        {filteredProducts.length !== 0 ? (
          filteredProducts.map((product) => (
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
                              alt=""
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
          ))
        ) : (
          <div className="">There is no items into that List</div>
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default SeachList;
