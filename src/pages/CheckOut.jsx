import Gamemouse from "../assets/SellingProducts/images/Gamemouse.png";
import { useContext } from "react";
import ExclusiveContext from "../context/ExclusiveContext";
import { useState } from "react";
import { Link } from "react-router-dom";

function CheckOut() {
  const { cartlistProducts, subTotalPrice, shippingCost, totalPrice } =
    useContext(ExclusiveContext);

  return (
    <section className="py-10 md:px-16 px-10">
      <div className="">
        <header>
          <h2 className="PoppinsFont mb-10">
            <Link to="/"> Home</Link> / <Link to="/cart"> cart </Link> /
            <span className="font-medium">Checkout</span>
          </h2>
        </header>
        <main className="md:flex space-y-16">
          <div className="md:w-1/2 w-full h-full">
            <h2 className="InterFont font-medium text-3xl mb-8">
              Billing Details
            </h2>
            <form className="flex flex-col space-y-2">
              <label
                htmlFor="firstName"
                className=""
                style={{ color: "#9b9b9b" }}
              >
                First Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                style={{ background: "#f5f5f5" }}
                className="md:w-[70%] w-full p-2 rounded outline-none"
              />
              <label
                htmlFor="firstName"
                className=""
                style={{ color: "#9b9b9b" }}
              >
                Company Name
              </label>
              <input
                type="text"
                id="firstName"
                style={{ background: "#f5f5f5" }}
                className="md:w-[70%] w-full p-2 rounded outline-none"
              />
              <label
                htmlFor="firstName"
                className=""
                style={{ color: "#9b9b9b" }}
              >
                Set Address<span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                style={{ background: "#f5f5f5" }}
                className="md:w-[70%] w-full p-2 rounded outline-none"
              />
              <label
                htmlFor="firstName"
                className=""
                style={{ color: "#9b9b9b" }}
              >
                Apartment, floor,ect.(optional){" "}
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                style={{ background: "#f5f5f5" }}
                className="md:w-[70%] w-full p-2 rounded outline-none"
              />
              <label
                htmlFor="firstName"
                className=""
                style={{ color: "#9b9b9b" }}
              >
                Town/City <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                style={{ background: "#f5f5f5" }}
                className="md:w-[70%] w-full p-2 rounded outline-none"
              />
              <label
                htmlFor="firstName"
                className=""
                style={{ color: "#9b9b9b" }}
              >
                Phone Number
                <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                style={{ background: "#f5f5f5" }}
                className="md:w-[70%] w-full p-2 rounded outline-none"
              />
              <label
                htmlFor="firstName"
                className=""
                style={{ color: "#9b9b9b" }}
              >
                Email Address
                <span className="text-red-600">*</span>
              </label>
              <input
                type=" "
                id="firstName"
                style={{ background: "#f5f5f5" }}
                className="md:w-[70%] w-full p-2 rounded outline-none"
              />
              <div className="flex gap-5">
                <input type="checkbox" id="checkbox" />
                <label>Details are True</label>
              </div>
            </form>
          </div>
          <div className="md:w-1/2 w-full h-full PoppinsFont">
            {cartlistProducts.map((item) => (
              <div className="mt-10" key={item.id}>
                <div className="flex justify-between items-center ">
                  <div className="flex items-center space-x-7 ">
                    <img
                      src={item.image[0]}
                      alt="LCD Monitor"
                      className="w-10"
                    />
                    <p className="inline-block truncate sm:w-[270px] md:w-[150px] ssm:w-[240px] w-[130px] lg:w-full">
                      {item.productName}
                    </p>
                  </div>
                  <div className="">
                    <p className="">
                      {(item.quantity * item.offerPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-10 border-b-2 pb-3">
              <p className="">Subtotal: </p>
              <p className="">{subTotalPrice}</p>
            </div>
            <div className="flex justify-between border-b-2 py-3">
              <p className="">Shipping: </p>
              <p className="">{shippingCost}</p>
            </div>
            <div className="flex justify-between py-4">
              <p className="">Total: </p>
              <p className="">{totalPrice}</p>
            </div>
            <div className="flex space-x-5 mt-3">
              <input type="radio" id="radiobtn" className="w-4" />
              <label htmlFor="radiobtn">Cash on delivery</label>
            </div>
            <div className=" flex justify-center mt-10">
              <button className=" PoppinsFont bg-secondary py-2 rounded-md  w-[150px] text-white">
                Place order
              </button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default CheckOut;
