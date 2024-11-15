import rightArrow from "../../assets/FlashSales/images/Arrowright.svg";
import leftArrow from "../../assets/FlashSales/images/Arrowleft.svg";
import Chair from "../../assets/FlashSales/images/chair.svg";
import gamepad from "../../assets/FlashSales/images/gamepad.svg";
import Gamingmoniter from "../../assets/FlashSales/images/Gamingmoniter.svg";
import Star from "../../assets/FlashSales/images/star.svg";
import Keyboard from "../../assets/FlashSales/images/Keyboard.svg";
import Wishlisticon from "../../assets/svg/Wishlisticon";
import Viewicon from "../../assets/svg/Viewicon";
function SellingProducts() {
  return (
    <div className="py-8">
      <div className="head flex gap-3 items-center pb-5">
        <div className="h-10 w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Today's</h3>
      </div>
      <div className="flex justify-between">
        <div className="crad-head flex gap-[89px]">
          <div className="Title InterFont text-4xl font-medium">
            <h3>Flash Sales</h3>
          </div>
        </div>
        <div className=" flex justify-center">
          <button className=" PoppinsFont bg-secondary py-2 rounded-md w-[159px] text-white text-base">
            View All
          </button>
        </div>
      </div>
      <div className="cards py-5">
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
            </div>
            <div className="star flex gap-2 py-1">
              {[1, 2, 3, 4, 5].map((_, index) => {
                return <img src={Star} alt="" key={index} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellingProducts;
