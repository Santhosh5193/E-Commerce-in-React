import { Link } from "react-router-dom";
// import Gamemouse from "../assets/SellingProducts/images/Gamemouse.png";
import Quantity from "../components/Quantity";
import { useContext, useEffect, useState } from "react";
import ExclusiveContext from "../context/ExclusiveContext";

function Cart() {
  const { productData, setIncrement } = useContext(ExclusiveContext);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = productData.reduce((acc, item) => {
      const price = parseFloat(item.offerPrice);
      return acc + (isNaN(price) ? 0 : price);
    }, 0);
    setTotalPrice(total.toFixed(2));
  }, [productData]);

  return (
    <section className="py-10 px-16 ">
      <div className="">
        <header>
          <h2 className="PoppinsFont mb-10">
            Home / <span className="font-medium">Cart</span>
          </h2>
        </header>

        <div className="flex justify-center ">
          <table className="w-[80%] mb-10 text-center border-separate border-spacing-y-8">
            <thead>
              <tr className="shadow-md rounded-md bg-white p-8">
                <th className="pb-4">Product</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4">Subtotal</th>
              </tr>
            </thead>
            {productData &&
              productData.map((cartlist) => (
                <tbody key={cartlist.id}>
                  <tr className="shadow-md rounded-md bg-white p-4">
                    <td className="flex gap-2 items-center p-4 pl-10">
                      <img
                        src={cartlist.image[0]}
                        alt="LCD Monitor"
                        className="w-10"
                      />
                      <p>{cartlist.productName}</p>
                    </td>
                    <td>₹{cartlist.offerPrice}</td>
                    <td>
                      <Quantity />
                    </td>
                    <td>₹{cartlist.offerPrice}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
      <div className="flex md:justify-end justify-center">
        <div className="border-2 px-10 py-5  md:w-[30%] w-[100%]">
          <h2 className="font-medium mb-3">Cart Total</h2>
          <div className="border-b-2 mb-2 flex justify-between">
            <p className="">Subtotal</p>
            <p className="">₹{totalPrice}</p>
          </div>
          <div className="border-b-2 mb-2 flex justify-between">
            <p className="">Shipping</p>
            <p className="">Free</p>
          </div>
          <div className=" flex justify-between">
            <p className="">Total</p>
            <p className="">₹{totalPrice}</p>
          </div>
          <div
            className="rounded w-[70%] mx-auto py-2 mt-5 text-center "
            style={{ background: "#DB4444", color: "white" }}
          >
            <button type="submit">
              <Link to="/cart/checkout"> Process to checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
