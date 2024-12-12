import CarouselDefault from "./CarouselDefault";
import Flahsales from "./Flahsales";
import Categories from "./Categories";
import SellingProducts from "./SellingProducts";
import FrameAddimg from "../../assets/images/FrameAdd.png";
import OurProducts from "./OurProducts";
import Featured from "./Featured";
import { useContext } from "react";
import ExclusiveContext from "../../context/ExclusiveContext";

function Home() {
  const { timeLeft } = useContext(ExclusiveContext);
  return (
    <div className="sm:px-16 px-7">
      <div className="lg:flex gap-12 sm:py-5 pt-5">
        <div className="lg:block hidden border-r-2 pr-28">
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
        <CarouselDefault />
      </div>
      <Flahsales />
      <Categories />
      <SellingProducts />
      <div
        className="pb-16 text-white lg:h-[60vh] px-12 py-16"
        style={{
          backgroundImage: `url(${FrameAddimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 style={{ color: "#00FF66" }} className="PoppinsFont pb-8">
          Categories
        </h1>
        <p className="md:text-5xl text-xl InterFont pb-8">
          Enhance Your <br /> Music Experience
        </p>
        <div className="hidden sm:block">
          <div className={`PoppinsFont flex gap-4`}>
            <div className="day text-black flex flex-col justify-center items-center bg-white w-14 h-14 rounded-full">
              <h2 className=" leading-3  text-base pb-[-10px]  font-semibold">
                {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
              </h2>
              <p className="leading-3  text-[11px] ">days</p>
            </div>
            <div className="day text-black flex flex-col justify-center items-center bg-white w-14 h-14 rounded-full">
              <h2 className=" leading-3  text-base pb-[-10px] font-semibold">
                {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
              </h2>
              <p className="leading-3  text-[11px]">Hours</p>
            </div>
            <div className="day text-black flex flex-col justify-center items-center bg-white w-14 h-14 rounded-full">
              <h2 className=" leading-3  text-base pb-[-10px] font-semibold">
                {timeLeft.minutes < 10
                  ? `0${timeLeft.minutes}`
                  : timeLeft.minutes}
              </h2>
              <p className="leading-3  text-[11px]">Minutes</p>
            </div>
            <div className="day text-black flex flex-col justify-center items-center bg-white w-14 h-14 rounded-full">
              <h2 className=" leading-3  text-base pb-[-10px] font-semibold">
                {timeLeft.seconds < 10
                  ? `0${timeLeft.seconds}`
                  : timeLeft.seconds}
              </h2>
              <p className="leading-3  text-[11px]">Seconds</p>
            </div>
          </div>
        </div>
      </div>
      <OurProducts />
      <Featured />
    </div>
  );
}

export default Home;
