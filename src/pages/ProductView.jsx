import Productview1 from "../assets/images/Productview1.png";
import Productview2 from "../assets/images/Productview2.png";
import Productview3 from "../assets/images/Productview3.png";
import Productview4 from "../assets/images/Productview4.png";
import Productview5 from "../assets/images/Productview5.png";
import Star from "../assets/FlashSales/images/star.svg";
import Quantity from "../components/Quantity";
import { Link } from "react-router-dom";
import Wishlisticon from "../assets/icons/Wishlist.svg";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

function ProductView() {
  const a = ["XS", "S", "M", "L", "XL"];
  const [productData, setProductData] = useState([]);
  const imagess = [Productview2, Productview3, Productview4, Productview5];
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductData(products);
        // Set the data to state
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData(); // Call the function to fetch data
  }, []);

  return (
    <section className="sm:py-10 sm:px-16 p-10 ">
      <div className="">
        <header>
          <h2 className="PoppinsFont mb-10">
            Home / Flashsales /{" "}
            <span className="font-medium">Product view </span>
          </h2>
        </header>
      </div>

      <div className="w-full flex md:flex-row flex-col space-y-5 md:space-y-0  md:space-x-5">
        <div className="grid grid-cols-2 md:flex md:flex-col md:w-[200px] gap-5 md:space-y-5">
          {imagess.map((i, index) => (
            <div
              key={index}
              className="rounded-lg w-full h-[150px] sm:w-[70%] sm:h-[150px] md:w-[170px] md:h-[138px]"
              style={{ background: "#F5F5F5" }}
            >
              <img src={i} alt="" className="p-3 object-cover w-full h-full" />
            </div>
          ))}
        </div>

        {/* {productData.map((item) => ( */}
        <div className="flex flex-wrap">
          {/* {item.images.map((img, index) => ( */}
          <div
            // key={index}
            className="flex items-center justify-center flex-grow lg:w-1/2 md:w-1/2 md:h-[600px] sm:w-[85%] sm:h-[400px] h-[200px] rounded-lg"
            style={{ background: "#F5F5F5" }}
          >
            <img
              src={Productview1}
              alt={"Product image"}
              className="lg:w-[90%] lg:h-[234px] md:w-[80%] w-[60%] h-[315px] object-contain"
            />
          </div>
          {/* ))} */}
        </div>
        {/* ))} */}

        <div className="flex-grow lg:w-1/2 md:w-1/2">
          {productData.length > 0 && (
            <div className="">
              <h2 className="InterFont text-[24px] font-semibold">
                {productData[0].productName}
              </h2>
              <div className="flex justify-center sm:justify-start flex-wrap space-x-5 items-center py-2">
                <div className="star flex  gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <img
                      key={index}
                      src={Star}
                      alt=""
                      className="w-[20px] h-[20px]"
                    />
                  ))}
                </div>
                <p className="PoppinsFont text-gray-300 pr-4 border-r-2">
                  (150 Reviews)
                </p>
                <p className="PoppinsFont" style={{ color: "#00FF66" }}>
                  In Stock
                </p>
              </div>
              <p className="InterFont text-[24px] mb-2">
                ${productData[0].price}
              </p>
              <p className="PoppinsFont pb-4  border-b-2">
                {productData[0].description}
              </p>

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
              </div>

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
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductView;
