import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Cancelicon from "../assets/icons/Cancelicon.svg";
import { useContext, useEffect, useState } from "react";
import ExclusiveContext from "../context/ExclusiveContext";
import EmptyCart from "../assets/images/EmptyCart.webp";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const {
    cartlistProducts,
    setCartlistProducts,
    userId,
    subTotalPrice,
    shippingCost,
    totalPrice,
  } = useContext(ExclusiveContext);

  const handleQuantityChange = async (id, change) => {
    try {
      if (!userId) {
        console.error("User not logged in.");
        return;
      }

      // Find the product to update
      const updatedProducts = cartlistProducts.map((product) => {
        if (product.id === id) {
          const currentQuantity = product.quantity || 1;
          const newQuantity = Math.min(
            Math.max(currentQuantity + change, 1),
            3
          ); // Ensure quantity is at least 1
          return { ...product, quantity: newQuantity };
        }
        return product;
      });

      // Update state
      setCartlistProducts(updatedProducts);

      // Update Firestore
      const cartRef = doc(db, "Cartlist", userId);
      await updateDoc(cartRef, { products: updatedProducts });
      console.log("Cart updated successfully");
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  // Event handlers for increment and decrement
  const handleIncrement = (id) => handleQuantityChange(id, 1);
  const handleDecrement = (id) => handleQuantityChange(id, -1);

  // handleCancellation
  const handleCancellation = async (itemId) => {
    try {
      const cartRef = doc(db, "Cartlist", userId);

      // Fetch the document data
      const cartItems = await getDoc(cartRef);
      // console.log(cartItems);

      if (cartItems.exists()) {
        const cartData = cartItems.data();

        // Filter out the item with the matching id
        const updatedProducts = cartData.products.filter(
          (product) => product.id !== itemId
        );

        await updateDoc(cartRef, { products: updatedProducts });

        setCartlistProducts(updatedProducts);
        toast.success("Item delted successfully");

        // console.log("Item deleted successfully");
      } else {
        console.error("No cart found for the given userId");
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error.message);
    }
  };

  return (
    <section className="py-10 md:px-14">
      <div className="">
        <header>
          <h2 className="PoppinsFont md:mb-10 mb-5 px-5">
            <Link to="/"> Home</Link> /{" "}
            <span className="font-medium">Cart</span>
          </h2>
        </header>
        {cartlistProducts.length !== 0 ? (
          <div className="">
            <div className="flex justify-center ">
              <table className="sm:w-[80%] w-[95%] mb-10 text-center border-separate border-spacing-y-8 table-fixed text-xs md:text-base">
                <thead>
                  <tr className="shadow-md rounded-md bg-white p-8 ">
                    <th className="pb-4 w-2/5">Product</th>
                    <th className="pb-4 w-1/5">Price</th>
                    <th className="pb-4 w-1/5">Quantity</th>
                    <th className="pb-4 w-1/5">Subtotal</th>
                  </tr>
                </thead>
                {cartlistProducts?.map((cartlist) => (
                  <tbody key={cartlist.id}>
                    <tr className="shadow-md rounded-md bg-white p-4">
                      <td className="flex flex-row  lg:flex-row md:gap-5 gap-2 items-center p-4 pl-5">
                        <div className="relative">
                          <img
                            src={cartlist.image[0]}
                            alt=""
                            className="lg:w-16 w-16"
                          />
                          <div
                            className="absolute top-[-10px] left-[-5px] cursor-pointer"
                            onClick={() => handleCancellation(cartlist.id)}
                          >
                            <img src={Cancelicon} alt="" />
                          </div>
                        </div>
                        <p className="inline-block truncate w-[100px] md:w-[160px] lg:w-[250px] text-xs md:text-base">
                          {cartlist.productName}
                        </p>
                      </td>
                      <td className="w-1/5">₹{cartlist.offerPrice}</td>
                      <td className="w-1/5">
                        <div className="inline-flex select-none">
                          <p
                            className={`px-1 border-2 border-r-0  rounded-l-sm md:px-2  cursor-pointer`}
                            onClick={() => handleDecrement(cartlist.id)}
                          >
                            -
                          </p>
                          <p className="border-2 md:px-2 px-1">
                            {cartlist.quantity}
                          </p>
                          <p
                            className={`px-1 border-2 border-l-0  rounded-r-sm md:px-2 cursor-pointer`}
                            onClick={() => handleIncrement(cartlist.id)}
                          >
                            +
                          </p>
                        </div>
                      </td>
                      <td className="w-1/5">
                        ₹{(cartlist.quantity * cartlist.offerPrice).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
            <div className="flex md:justify-end justify-center text-sm sm:text-base">
              <div className="border-2 md:px-10 sm:px-5 mx-5 px-3 py-5 lg:w-[40%] md:w-[50%] sm:w-[50%] w-[100%]">
                <h2 className="font-medium mb-3">Cart Total</h2>
                <div className="border-b-2 mb-2 flex justify-between">
                  <p className="">Subtotal</p>
                  <p className="">₹{subTotalPrice}</p>
                </div>
                <div className="border-b-2 mb-2 flex justify-between">
                  <p className="">Shipping</p>
                  <p className="">{shippingCost}</p>
                </div>
                <div className=" flex justify-between">
                  <p className="">Total</p>
                  <p className="">₹{totalPrice}</p>
                </div>
                <div
                  className="rounded w-[60%] sm:w-[70%] mx-auto py-2 mt-5 text-center "
                  style={{ background: "#DB4444", color: "white" }}
                >
                  <button type="submit">
                    <Link to="/cart/checkout">
                      <p>Process to checkout</p>
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="flex flex-col justify-center items-center h-[50vh]"
            style={{ boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px" }}
          >
            <img src={EmptyCart} alt="" className="h-[162px] w-[221px]" />
            <p className="text-lg pt-12">Your cart is MT!</p>
            <p className="pt-5 text-gray-500">
              Explore our wide selection and find something you like
            </p>
          </div>
        )}
      </div>
      <ToastContainer autoClose={2000} />
    </section>
  );
}

export default Cart;
