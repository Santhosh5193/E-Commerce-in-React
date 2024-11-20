import Gamemouse from "../assets/SellingProducts/images/Gamemouse.png";
import { useContext } from "react";
import ExclusiveContext from "../context/ExclusiveContext";
import { useState } from "react";

function CheckOut() {
  const { productView, setProductView } = useContext(ExclusiveContext);

  return (
    <section className="py-10 px-16">
      <div className="">
        <header>
          <h2 className="PoppinsFont mb-10">
            Home / cart / <span className="font-medium">Checkout</span>
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
            <div className="space-y-5">
              <div className="flex justify-between ">
                <div className="flex space-x-7">
                  <img src={Gamemouse} alt="LCD Monitor" className="w-10" />
                  <p className=" ">LCD Monitor </p>
                </div>
                <p className="">$650</p>
              </div>
              <div className="flex justify-between ">
                <div className="flex space-x-7">
                  <img src={Gamemouse} alt="LCD Monitor" className="w-10" />
                  <p className=" ">LCD Monitor </p>
                </div>
                <p className="">$650</p>
              </div>
            </div>
            <div className="flex justify-between mt-10 border-b-2 pb-3">
              <p className="">Subtotal: </p>
              <p className="">$1300</p>
            </div>
            <div className="flex justify-between border-b-2 py-3">
              <p className="">Shipping: </p>
              <p className="">Free</p>
            </div>
            <div className="flex justify-between py-4">
              <p className="">Total: </p>
              <p className="">$1300</p>
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
