import Star from "../assets/FlashSales/images/star.svg";
import Quantity from "../components/Quantity";
import { Link, useParams } from "react-router-dom";
import Wishlisticon from "../assets/icons/Wishlist.svg";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useContext } from "react";
import ExclusiveContext from "../context/ExclusiveContext";

function ProductView() {
  const { productView, setProductView } = useContext(ExclusiveContext);
  const a = ["XS", "S", "M", "L", "XL"];
  const [productData, setProductData] = useState([]);
  const [hoveredImage, setHoveredImage] = useState("");
  const [clickImage, setClickImage] = useState("");

  useEffect(() => {
    if (productView) {
      localStorage.setItem("productView", productView);
    }
  }, [productView]);

  useEffect(() => {
    const savedProductView = localStorage.getItem("productView");

    if (savedProductView) {
      setProductView(savedProductView);

      const fetchProductData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "Products"));
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
    }
  }, []);

  const handleCartHover = (image) => {
    setHoveredImage(image);
  };

  const handleCartNotHover = () => {
    setHoveredImage("");
  };

  const handleCartClick = (image) => {
    setClickImage(image);
  };

  return (
    <section className="sm:py-10 md:px-16 sm:px-10 px-7 py-5">
      <div className="">
        <header>
          <h2 className="PoppinsFont sm:mb-10 mb-5">
            <Link to="/home">Home</Link> / Flashsales /
            <span className="font-medium">Product view </span>
          </h2>
        </header>
      </div>

      {productData
        .filter((item) => productView === item.id)
        .map((item) => (
          <div
            key={item.id}
            className="w-full flex md:flex-row flex-col space-y-5 md:space-y-0  md:space-x-5"
          >
            <div className="flex flex-col md:w-1/2 justify-center items-center space-y-5">
              <div className="flex items-center justify-center md:h-[350px] h-[300px] w-[80%] bg-white border-2 p-3">
                <img
                  src={hoveredImage || clickImage || item.image[0]}
                  alt="Product image"
                  className="w-[80%] h-[80%] object-contain"
                />
              </div>
              <div className="flex space-x-5 justify-between ">
                {item.image.map((i, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => handleCartHover(i)}
                    onMouseLeave={handleCartNotHover}
                    onClick={() => handleCartClick(i)}
                    className="w-30 h-30  md:w-20 md:h-20 lg:w-28 lg:h-28 flex items-center justify-center  border-2 p-3 cursor-pointer"
                  >
                    <img
                      src={i}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex md:w-1/2">
              <div className="">
                <h2 className="InterFont sm:text-2xl  font-semibold">
                  {item.productName}
                </h2>
                <div className="flex justify-start flex-wrap sm:space-x-5 space-x-2 items-center py-2">
                  <div className="star flex gap-2 py-1">
                    {item.ratings.map((_, index) => (
                      <img
                        key={index}
                        src={Star}
                        alt=""
                        className="sm:w-[20px] sm:h-[20px] "
                      />
                    ))}
                  </div>
                  <p className="PoppinsFont text-gray-300 sm:pr-4 pr-2 border-r-2 text-sm">
                    (150 Reviews)
                  </p>
                  <p className="PoppinsFont" style={{ color: "#00FF66" }}>
                    In Stock
                  </p>
                </div>
                <p className="InterFont text-[24px] mb-2">
                  ₹{item.originalPrice}
                </p>
                <p className="PoppinsFont pb-4  border-b-2 text-sm sm:text-base">
                  {item.description}
                </p>
                {/* 
                <div className="flex space-x-5 items-center pt-5">
                  <p className="InterFont">Size: </p>
                  <div className="flex space-x-5 justify-center text-center">
                    {a.map((size, index) => (
                      <div
                        key={index}
                        className="border-2 w-7 h-7 rounded-sm p-1"
                      >
                        <p className="text-[14px] PoppinsFont cursor-pointer">
                          {size}
                        </p>
                      </div>
                    ))}
                  </div>
                </div> */}

                <div className="mt-5 flex items-center space-x-8">
                  <div className="">
                    <Quantity />
                  </div>
                  <div
                    className="rounded w-[25%] py-[2px] text-center "
                    style={{ background: "#DB4444", color: "white" }}
                  >
                    <button type="submit">
                      <Link to="/cart/checkout">Buy Now</Link>
                    </button>
                  </div>
                  <div className="w-7 h-7 border-2 rounded-md items-center flex justify-center">
                    <img src={Wishlisticon} alt="" className="w-4 " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </section>
  );
}

export default ProductView;
