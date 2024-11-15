import rightArrow from "../../assets/FlashSales/images/Arrowright.svg";
import leftArrow from "../../assets/FlashSales/images/Arrowleft.svg";
import Chair from "../../assets/FlashSales/images/chair.svg";
import gamepad from "../../assets/FlashSales/images/gamepad.svg";
import Gamingmoniter from "../../assets/FlashSales/images/Gamingmoniter.svg";
import Star from "../../assets/FlashSales/images/star.svg";
import Keyboard from "../../assets/FlashSales/images/Keyboard.svg";
import Wishlisticon from "../../assets/svg/Wishlisticon";
import Viewicon from "../../assets/svg/Viewicon";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

function Flahsales() {
  const [productData, setProductData] = useState([]);
  const flashImages = [gamepad, Keyboard, Gamingmoniter, Chair, Chair];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductData(products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  //Count down
  // useEffect(() => {
  //   const targetDate = new Date("2024-11-18T23:59:59").getTime(); // Replace with your target date

  //   const calculateTimeLeft = () => {
  //     const currentTime = new Date().getTime();
  //     const difference = targetDate - currentTime;

  //     if (difference > 0) {
  //       const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  //       const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  //       const minutes = Math.floor((difference / (1000 * 60)) % 60);
  //       const seconds = Math.floor((difference / 1000) % 60);

  //       setTimeLeft({ days, hours, minutes, seconds });
  //     } else {
  //       clearInterval(interval);
  //     }
  //   };

  //   const interval = setInterval(calculateTimeLeft, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const cardsRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // useEffect(() => {
  //   productData.forEach((details, index) => {
  //     console.log(details.productName);
  //   });
  // }, [productData]);

  console.log(productData);
  return (
    <div className="border-b-2 py-8">
      <div className="head flex gap-3 items-center pb-5">
        <div className="h-10 w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Today's</h3>
      </div>
      <div className="flex justify-between">
        <div className="crad-head flex sm: pb-5 flex-col sm:flex-row  lg:gap-x-[89px] md:gap-x-[50px] gap-x-[15px] space-y-2">
          <div className="Title InterFont md:text-4xl text-2xl font-medium text-nowrap">
            <h3>Flash Sales</h3>
          </div>
          <div className="Timer flex items-center  sm:space-x-5 space-x-2">
            <div className="days">
              <p className="PoppinsFont sm:text-xs text-[10px]">Days</p>
              <div className="flex lg:space-x-5 space-x-3 ">
                <h2 className="InterFont font-bold lg:text-[32px] sm:text-[28px]">
                  {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
                </h2>
                <p className="sm:text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Hours">
              <p className="PoppinsFont sm:text-xs text-[10px]">Hours</p>
              <div className="flex lg:space-x-5 space-x-3">
                <span className="InterFont font-bold lg:text-[32px] sm:text-[28px]">
                  {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
                </span>
                <p className="sm:text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Minutes">
              <p className="PoppinsFont sm:text-xs text-[10px]">Minutes</p>
              <div className="flex lg:space-x-5 space-x-3">
                <span className="InterFont font-bold lg:text-[32px] sm:text-[28px]">
                  {timeLeft.minutes < 10
                    ? `0${timeLeft.minutes}`
                    : timeLeft.minutes}
                </span>
                <p className="sm:text-2xl text-secondary font-semibold">:</p>
              </div>
            </div>
            <div className="Seconds">
              <p className="PoppinsFont sm:text-xs text-[10px]">Seconds</p>
              <span className="InterFont font-bold lg:text-[32px] sm:text-[28px]">
                {timeLeft.seconds < 10
                  ? `0${timeLeft.seconds}`
                  : timeLeft.seconds}
              </span>
            </div>
          </div>
        </div>
        <div className="arrows flex gap-3 ">
          <div
            className="bg-gray-200 sm:w-9 sm:h-9 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={scrollLeft}
          >
            <div className="sm:w-8 sm:h-8 w-5 h-5 flex justify-center items-center">
              <img src={leftArrow} alt="" className="w-5 sm:w-full" />
            </div>
          </div>
          <div
            className="bg-gray-200 sm:w-9 sm:h-9 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={scrollRight}
          >
            <div className="sm:w-8 sm:h-8 w-5 h-5 flex justify-center items-center">
              <img src={rightArrow} alt="" className="w-5 sm:w-full" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="cards pb-5 flex overflow-x-hidden space-x-5"
        ref={cardsRef}
      >
        {productData.map((product) => (
          <div key={product.id}>
            <div className=" card-1 relative w-[270px] h-[340px] rounded-md border-2">
              <div className="card-head  bg-gray-100  h-[250px] flex justify-center items-center ">
                <img src={gamepad} alt="" className="w-[190px] h-[180px]" />
              </div>
              <div className="card-body p-2">
                <div className="">
                  <h2 className=""> {product.productName}</h2>
                  <div className="rate flex gap-3">
                    <h2 className="text-red-500">${product.price}</h2>
                    <h2 className="line-through">$160</h2>
                    <div className="absolute  bg-white top-3 right-3 rounded-full">
                      <div className="w-9 h-9 flex justify-center items-center ">
                        <Wishlisticon />
                      </div>
                    </div>
                    <div className="absolute  bg-white top-14 right-3 rounded-full">
                      <div className="w-9 h-9 flex justify-center items-center ">
                        <Link to="/productview">
                          <Viewicon />
                        </Link>
                      </div>
                    </div>
                    <div className="absolute bg-secondary text-white top-2 left-2 rounded-md px-3 py-1">
                      <div className="flex justify-center items-center ">
                        <p className="tracking-wider text-sm">
                          -{product.offer}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="star flex gap-2 py-1">
                    {product.ratings.map((star) => (
                      <img src={Star} key={star} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
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
