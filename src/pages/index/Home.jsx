import CarouselDefault from "./CarouselDefault";
import Flahsales from "./Flahsales";
import Categories from "./Categories";
import SellingProducts from "./SellingProducts";
import FrameAddimg from "../../assets/images/FrameAdd.png";
import OurProducts from "./OurProducts";
import Featured from "../Featured";


function Home() {
  return (
    <div className="px-16">
      <div className="flex gap-24 py-5">
        <div className="border-r-2 pr-28">
          <ul className="listfont leading-9 text-nowrap">
            <li className="">Men's Fashion</li>
            <li className="">Women's Fashion</li>
            <li className="">Electronics</li>
            <li className="">Home & Lifestyle</li>
            <li className="">Medicine</li>
            <li className="">Sports & Outdoor</li>
            <li className="">Baby's & Toys</li>
            <li className="">Geoceries & Pets</li>
            <li className="">Health & Beauty</li>
          </ul>
        </div>
        <div>
          <CarouselDefault />
        </div>
      </div>
      <Flahsales />
      <Categories />
      <SellingProducts />
      <div
        className="pb-16 text-white h-[60vh] px-12 py-16"
        style={{
          backgroundImage: `url(${FrameAddimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 style={{ color: "#00FF66" }} className="PoppinsFont pb-8">
          Categories
        </h1>
        <p className="text-5xl InterFont pb-8">
          Enhance Your <br /> Music Experience
        </p>
        <div className="PoppinsFont flex gap-4">
          <div className="day text-black flex flex-col justify-center items-center bg-white w-14 h-14 rounded-full">
            <h2 className=" leading-3  text-base pb-[-10px]  font-semibold">
              23
            </h2>
            <p className="leading-3  text-[11px] ">Days</p>
          </div>
          <div className="day text-black flex flex-col justify-center items-center bg-white w-14 h-14 rounded-full">
            <h2 className=" leading-3  text-base pb-[-10px] font-semibold">
              03
            </h2>
            <p className="leading-3  text-[11px]">Hours</p>
          </div>
          <div className="day text-black flex flex-col justify-center items-center bg-white w-14 h-14 rounded-full">
            <h2 className=" leading-3  text-base pb-[-10px] font-semibold">
              23
            </h2>
            <p className="leading-3  text-[11px]">Minutes</p>
          </div>
          <div className="day text-black flex flex-col justify-center items-center bg-white w-14 h-14 rounded-full">
            <h2 className=" leading-3  text-base pb-[-10px] font-semibold">
              23
            </h2>
            <p className="leading-3  text-[11px]">Seconds</p>
          </div>
        </div>
      </div>
      <OurProducts />
      <Featured />
      {/* <div className="grid grid-cols-2 grid-rows-2 gap-x-6 gap-y-6">
        <div className="">
          <img
            src={ArraivalImg1}
            alt=""
            // className="w-full h-full object-cover"
          />
        </div>
        <div className="grid grid-rows-2 grid-cols-2 gap-0">
          <div className="bg-gray-300 col-span-2">
            <img src={ArraivalImg2} alt="" />
          </div>
          <div className="bg-gray-400">
            <img src={ArraivalImg3} alt="" />
          </div>
          <div className="bg-gray-500">
            <img src={ArraivalImg4} alt="" />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
