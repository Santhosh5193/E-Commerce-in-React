import { Link } from "react-router-dom";
import Gamemouse from "../assets/SellingProducts/images/Gamemouse.png";
import Quantity from "../components/Quantity";

function Cart() {
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
            <tbody>
              <tr className="shadow-md rounded-md bg-white p-4">
                <td className="flex gap-2 items-center justify-center p-4">
                  <img src={Gamemouse} alt="LCD Monitor" className="w-10" />
                  <p>LCD Monitor</p>
                </td>
                <td>$560</td>
                <td>
                  <Quantity />
                </td>
                <td>$650</td>
              </tr>
              <tr className="shadow-md rounded-md bg-white p-4">
                <td className="flex gap-2 items-center justify-center p-4">
                  <img src={Gamemouse} alt="LCD Monitor" className="w-10" />
                  <p>LCD Monitor</p>
                </td>
                <td>$150</td>
                <td>
                  <Quantity />
                </td>
                <td>$800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex md:justify-end justify-center">
        <div className="border-2 px-10 py-5  md:w-[30%] w-[100%]">
          <h2 className="font-medium mb-3">Cart Total</h2>
          <div className="border-b-2 mb-2 flex justify-between">
            <p className="">Subtotal</p>
            <p className="">$1450</p>
          </div>
          <div className="border-b-2 mb-2 flex justify-between">
            <p className="">Shipping</p>
            <p className="">Free</p>
          </div>
          <div className=" flex justify-between">
            <p className="">Total</p>
            <p className="">$1450</p>
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
