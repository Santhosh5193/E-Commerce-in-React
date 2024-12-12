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
    <div className="mt-10">
      <div>
        <div className="head flex gap-3 items-center pb-3 sm:pb-5">
          <div className="sm:h-10 h-7 w-2 sm:w-5 bg-secondary rounded-md"></div>
          <h3 className="text-red-600 PoppinsFont font-semibold">Featured's</h3>
        </div>
        <div className="Title InterFont md:text-4xl sm:text-2xl font-medium sm:pb-10 pb-4">
          <h3>New Arrival</h3>
        </div>

        <div className="h-full  md:h-[600px] flex flex-col  md:flex-row gap-5 pb-10">
          <div className="w-full md:w-[50%] h-full max-h-[650px] relative">
            <img
              src={ArraivalImg1}
              className="w-full h-full	"
              alt="ArraivalImg1"
            />
            <div className="absolute sm:bottom-10 bottom-5 left-5">
              <h2 className="text-white sm:text-3xl font-semibold InterFont sm:mb-1">
                PlayStation 5
              </h2>
              <p className="text-gray-300 text-xs sm:text-lg mb-1">
                Black and White version of the PS5 <br /> coming out on sale.
              </p>
              <p className="text-gray-200 underline underline-offset-4">
                Shop Now
              </p>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-[50%] h-full justify-between gap-2">
            <div className="relative h-[50%]">
              <img
                src={ArraivalImg2}
                className="w-full h-full"
                alt="ArraivalImg2"
              />
              <div className="absolute sm:bottom-3 bottom-5 left-5">
                <h2 className="text-white sm:text-xl md:text-3xl font-semibold InterFont sm:mb-1">
                  Womens Collection
                </h2>
                <p className="text-gray-300 text-xs md:text-lg mb-1">
                  Featured woman collections that <br />
                  give you another vibe.
                </p>
                <p className="text-gray-200 underline underline-offset-4">
                  Shop Now
                </p>
              </div>
            </div>
            <div className="w-full h-[48%] flex flex-row justify-between gap-3">
              <div className="w-[50%] relative">
                <img
                  src={ArraivalImg3}
                  className="h-full w-full object-cover"
                  alt="ArraivalImg3"
                />
                <div className="absolute sm:bottom-3 bottom-5 left-5">
                  <h2 className="text-white sm:text-xl md:text-2xl lg:text-3xl  font-semibold InterFont sm:mb-1">
                    Speakers
                  </h2>
                  <p className="text-gray-200 text-xs md:text-lg">
                    Amazon wireless speakers
                  </p>
                  <p className="text-gray-100 underline underline-offset-4">
                    Shop Now
                  </p>
                </div>
              </div>
              <div className="w-[50%] relative">
                <img
                  src={ArraivalImg4}
                  className="h-full w-full object-cover	"
                  alt="ArraivalImg4"
                />
                <div className="absolute sm:bottom-3 bottom-5 left-5">
                  <h2 className="text-white sm:text-xl md:text-2xl lg:text-3xl  font-semibold InterFont sm:mb-1">
                    Perfume
                  </h2>
                  <p className="text-gray-200 text-xs md:text-lg">
                    GUCCI INTENSE UOD EDP
                  </p>
                  <p className="text-gray-100 underline underline-offset-4">
                    Shop Now
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="PoppinsFont sm:flex space-y-5 items-center justify-evenly pb-10">
        <div className="flex flex-col items-center">
          <img src={Services} alt="Services" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 sm:text-xl">
              FREE AND FAST DELIVERY
            </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src={Services1} alt="Services1" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 sm:text-xl">
              FREE AND FAST DELIVERY
            </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src={Services2} alt="Services2" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 sm:text-xl">
              FREE AND FAST DELIVERY
            </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;
