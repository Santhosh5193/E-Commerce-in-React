import gamepad from "./../assets/FlashSales/images/gamepad.svg";
import deleteicon from "../assets/icons/Deleteicon.svg";
import Wishlistcarticon from "../assets/icons/Wishlisticon1.svg";
function Wishlist() {
  return (
    <div className=" py-10 px-14 ">
      <div className="flex mb-10 justify-between PoppinsFont">
        <div className="">
          <p className="font-normal text-lg">
            Wishlist (<span>3</span>)
          </p>
        </div>
        <div className=" border-2 rounded font-medium  text-base">
          <button className="px-4 py-2">Move All To Bag</button>
        </div>
      </div>
      <div className="cards pb-5">
        <div className="card-1 relative w-[270px] h-[360px] rounded-md border-2">
          <div className="card-head  bg-gray-100  h-[250px] flex justify-center items-center ">
            <img src={gamepad} alt="" className="w-[190px] h-[180px]" />
          </div>
          <button
            className="w-full flex justify-center gap-3 py-2"
            style={{ background: "black", color: "white" }}
          >
            <img src={Wishlistcarticon} alt="" />
            <p className="">Add To Cart</p>
          </button>
          <div className="card-body p-2  ">
            <h2 className="">HAVIT HV-G92 Gamepad</h2>
            <div className="rate flex gap-3">
              <h2 className="text-red-500">$120</h2>
              <h2 className="line-through">$160</h2>
              <div className="absolute  bg-white top-3 right-3 rounded-full">
                <div className="w-9 h-9 flex justify-center items-center ">
                  <img src={deleteicon} alt="" />
                </div>
              </div>
              <div className="absolute bg-secondary text-white top-2 left-2 rounded-md px-3 py-1">
                <div className="flex justify-center items-center ">
                  <p className="tracking-wider text-sm">-40%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
