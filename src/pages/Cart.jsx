import { Link } from "react-router-dom";
// import Gamemouse from "../assets/SellingProducts/images/Gamemouse.png";
import Quantity from "../components/Quantity";
import { useContext, useEffect, useState } from "react";
import ExclusiveContext from "../context/ExclusiveContext";
import { GiPriceTag } from "react-icons/gi";

function Cart() {
  const { productData, cartlistProducts, userId } =
    useContext(ExclusiveContext);
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const data = cartlistProducts.filter((cart) => cart.id === userId);
    setCartData(data);
    const total = CalculateCartsTotal(data);
    console.log(total);
  }, [cartlistProducts]);

  // console.log(cartData);
  // useEffect(() => {
  //   const initialQuantities = {};
  //   console.log(cartlistProducts);

  //   // cartlistProducts.forEach((cart) => {
  //   //   cart?.products.forEach((product) => {
  //   //     initialQuantities[product.id] = product.quantity || 1;
  //   //   });
  //   // });

  //   // setQuantities(initialQuantities);
  //   // console.log(cartlistProducts);
  // }, [cartlistProducts]);

  const CalculateCartsTotal = (cartData) => {
    console.log(cartData);
    cartData.map((cartitem) =>
      cartitem.products.map((item) => {
        console.log(item.price);
      })
    );
    // cartData.reduce((acc, cart) => {
    //   cart.products?.forEach((item) => {
    //     const quantity = quantities[item.id] || 1;
    //     const subtotal = item.offerPrice * quantity;
    //     acc += subtotal;
    //   });
    //   return acc;
    // }, 0);
  };
  // useEffect(() => {
  //   setTotalPrice(total.toFixed(2));
  // }, [cartlistProducts, quantities]);

  // Increment
  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] < 3 ? prev[id] + 1 : 3,
    }));
  };

  // Decrement
  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  return (
    <section className="py-10 px-16 ">
      <div className="">
        <header>
          <h2 className="PoppinsFont mb-10">
            Home / <span className="font-medium">Cart</span>
          </h2>
        </header>

        <div className="flex justify-center ">
          <table className="w-[80%] mb-10 text-center border-separate border-spacing-y-8 table-fixed">
            <thead>
              <tr className="shadow-md rounded-md bg-white p-8">
                <th className="pb-4 w-1/4">Product</th>
                <th className="pb-4 w-1/4">Price</th>
                <th className="pb-4 w-1/4">Quantity</th>
                <th className="pb-4 w-1/4">Subtotal</th>
              </tr>
            </thead>
            {cartData &&
              cartData?.map((cartlist) => (
                <tbody key={cartlist.id}>
                  {cartlist.products?.map((item) => (
                    <tr
                      className="shadow-md rounded-md bg-white p-4"
                      key={item.id}
                    >
                      <td className="flex gap-2 items-center p-4 pl-10">
                        <img
                          src={item.image[0]}
                          alt="LCD Monitor"
                          className="w-10"
                        />
                        <p className="inline-block truncate">
                          {item.productName}
                        </p>
                      </td>
                      <td className="w-1/5">₹{item.offerPrice}</td>
                      <td className="w-1/5">
                        {/* <Quantity /> */}
                        <div className="inline-flex select-none">
                          <p
                            className={`border-2 border-r-0  rounded-l-sm px-2 cursor-pointer`}
                            onClick={() => handleDecrement(item.id)}
                          >
                            -
                          </p>
                          <p className="border-2 w-10">{quantities[item.id]}</p>
                          <p
                            className={`border-2 border-l-0  rounded-r-sm px-2 cursor-pointer`}
                            onClick={() => handleIncrement(item.id)}
                          >
                            +
                          </p>
                        </div>
                      </td>
                      <td className="w-1/5">
                        ₹{(item.offerPrice * quantities[item.id]).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
          </table>
        </div>
      </div>
      <div className="flex md:justify-end justify-center">
        <div className="border-2 md:px-10 sm:px-5 px-3 py-5  md:w-[50%] w-[100%]">
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
            className="rounded sm:w-[70%] mx-auto py-2 mt-5 text-center "
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
    </section>
  );
}

export default Cart;
