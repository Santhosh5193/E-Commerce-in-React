import React from "react";
import ArraivalImg1 from "../../assets/images/Arraival1.png";
import ArraivalImg2 from "../../assets/images/Arraival2.png";
import ArraivalImg3 from "../../assets/images/Arraival3.png";
import ArraivalImg4 from "../../assets/images/Arraival4.png";
import Services from "../../assets/icons/Services.svg";
import Services1 from "../../assets/icons/Services1.svg";
import Services2 from "../../assets/icons/Services2.svg";

function Featured() {
  return (
    <div>
      <div>
        <div className="head flex gap-3 items-center pb-5">
          <div className="h-10 w-5 bg-secondary rounded-md"></div>
          <h3 className="text-red-600 PoppinsFont font-semibold">Featured's</h3>
        </div>
        <div className="Title InterFont text-4xl font-medium pb-14">
          <h3>New Arrival</h3>
        </div>

        <div className="h-full  md:h-[600px] flex flex-col  md:flex-row gap-5 pb-10">
          <div className="w-full md:w-[50%] h-full max-h-[650px]">
            <img src={ArraivalImg1} className="w-full h-full	" alt="" />
          </div>
          <div className="flex flex-col w-full md:w-[50%] h-full justify-between gap-2">
            <div className="w-full h-[50%]">
              <img src={ArraivalImg2} className="w-full h-full	 " alt="" />
            </div>
            <div className="w-full h-[48%] flex flex-row justify-between gap-3">
              <div className="w-[50%]">
                <img
                  src={ArraivalImg3}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-[50%]">
                <img
                  src={ArraivalImg4}
                  className="h-full w-full object-cover	"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="PoppinsFont sm:flex space-y-5 items-center justify-evenly pb-10">
        <div className="flex flex-col items-center">
          <img src={Services} alt="Services" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 text-xl">FREE AND FAST DELIVERY </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src={Services1} alt="Services1" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 text-xl">FREE AND FAST DELIVERY </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src={Services2} alt="Services2" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 text-xl">FREE AND FAST DELIVERY </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
