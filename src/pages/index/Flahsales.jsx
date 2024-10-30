import rightArrow from "../../assets/FlashSales/images/Arrowright.svg";
import leftArrow from "../../assets/FlashSales/images/Arrowleft.svg";
import Chair from "../../assets/FlashSales/images/chair.svg";
import gamepad from "../../assets/FlashSales/images/gamepad.svg";
import Gamingmoniter from "../../assets/FlashSales/images/Gamingmoniter.svg";
import Star from "../../assets/FlashSales/images/star.svg";
import Keyboard from "../../assets/FlashSales/images/Keyboard.svg";
import Wishlisticon from "../../assets/svg/Wishlisticon";
import Viewicon from "../../assets/svg/Viewicon";
function Flahsales() {
  return (
    <div className="px-10 py-5">
      <div className="head flex gap-3 items-center pb-5">
        <div className="h-10 w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Today's</h3>
      </div>
      <div className="flex justify-between">
        <div className="crad-head flex pb-5  gap-[89px]">
          <div className="Title InterFont text-4xl font-medium">
            <h3>Flash Sales</h3>
          </div>
          <div className="Timer flex gap-6">
            <div className="days">
              <p className="PoppinsFont text-xs">Days</p>
              <div className="flex gap-6">
                <span className="InterFont font-bold text-[32px]">03</span>
                <p className="text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Hours">
              <p className="PoppinsFont text-xs">Hours</p>
              <div className="flex gap-6">
                <span className="InterFont font-bold text-[32px]">23</span>
                <p className="text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Minutes">
              <p className="PoppinsFont text-xs">Minutes</p>
              <div className="flex gap-6">
                <span className="InterFont font-bold text-[32px]">19</span>
                <p className="text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Seconds">
              <p className="PoppinsFont text-xs">Seconds</p>
              <span className="InterFont font-bold text-[32px]">53</span>
            </div>
          </div>
        </div>
        <div className="arrows flex gap-3">
          <div className="bg-gray-200 w-9 h-9 rounded-full">
            <div className="w-8 h-8 flex justify-center items-center">
              <img src={leftArrow} alt="" />
            </div>
          </div>
          <div className="bg-gray-200 w-9 h-9 rounded-full">
            <div className="w-8 h-8 flex justify-center items-center">
              <img src={rightArrow} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="cards pb-5">
        <div className="card-1 relative w-[270px] h-[340px] rounded-md border-2">
          <div className="card-head  bg-gray-100  h-[250px] flex justify-center items-center ">
            <img src={gamepad} alt="" className="w-[190px] h-[180px]" />
          </div>
          <div className="card-body p-2  ">
            <h2 className="">HAVIT HV-G92 Gamepad</h2>
            <div className="rate flex gap-3">
              <h2 className="text-red-500">$120</h2>
              <h2 className="line-through">$160</h2>
              <div className="absolute  bg-white top-3 right-3 rounded-full">
                <div className="w-9 h-9 flex justify-center items-center ">
                  <Wishlisticon />
                </div>
              </div>
              <div className="absolute  bg-white top-14 right-3 rounded-full">
                <div className="w-9 h-9 flex justify-center items-center ">
                  <Viewicon />
                </div>
              </div>
              <div className="absolute bg-secondary text-white top-2 left-2 rounded-md px-3 py-1">
                <div className="flex justify-center items-center ">
                  <p className="tracking-wider text-sm">-40%</p>
                </div>
              </div>
            </div>
            <div className="star flex gap-2 py-1">
              {[1, 2, 3, 4, 5].map(() => {
                return <img src={Star} alt="" />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className=" flex justify-center">
        <button className=" PoppinsFont bg-secondary py-2 rounded-md  w-[230px] text-white text-base">
          View All Products
        </button>
      </div>
    </div>
  );
}

export default Flahsales;
