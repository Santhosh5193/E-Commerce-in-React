import React from "react";
import ArraivalImg1 from "./../assets/images/Arraival1.png";
import ArraivalImg2 from "./../assets/images/Arraival2.png";
import ArraivalImg3 from "./../assets/images/Arraival3.png";
import ArraivalImg4 from "./../assets/images/Arraival4.png";

function Featured() {
  return (
    <div>
      <div className="head flex gap-3 items-center pb-5">
        <div className="h-10 w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Featured's</h3>
      </div>
      <div className="Title InterFont text-4xl font-medium">
        <h3>New Arrival</h3>
      </div>

      {/* <div className="grid grid-cols-4 grid-rows-2 gap-x-10 gap-y-0 h-full">
        <div className="col-span-2 row-span-2 bg-gray-200">
          <img
            src={ArraivalImg1}
            alt=""
            className="w-full h-fit object-cover"
          />
        </div>
        <div className="col-span-2 row-span-1 bg-gray-300">
          <img src={ArraivalImg2} alt="" className="w-full h-52 object-cover" />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-400">
          <img src={ArraivalImg3} alt="" className="w-full h-52 object-cover" />
        </div>
        <div className="col-span-1 row-span-1 bg-gray-500">
          <img src={ArraivalImg4} alt="" className="w-full h-52 object-cover" />
        </div>
      </div> */}
      <div className="h-full  md:h-[600px] flex flex-col  md:flex-row gap-5">
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
  );
}

export default Featured;
