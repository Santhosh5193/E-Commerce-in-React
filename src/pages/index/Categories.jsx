import { useEffect, useRef, useState } from "react";
import cellPhone from "../../assets/BrowseCategery/images/cellPhone.svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import rightArrow from "../../assets/FlashSales/images/Arrowright.svg";
import leftArrow from "../../assets/FlashSales/images/Arrowleft.svg";

function Categories() {
  const [productData, setProductData] = useState([]);

  //Fetch data from firebase
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Category"));
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

  // Scrolling section
  const cardsRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (cardsRef.current) {
      const containerWidth = cardsRef.current.offsetWidth;
      const scrollAmount = containerWidth * 0.2; // 20% of the container width
      cardsRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (cardsRef.current) {
      const containerWidth = cardsRef.current.offsetWidth;
      const scrollAmount = containerWidth * 0.2; // 20% of the container width
      cardsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="py-8 border-b-2">
      <div className="head flex gap-3 items-center pb-5">
        <div className="h-10 w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Categories's</h3>
      </div>
      <div className=" flex justify-between">
        <div className="Title InterFont md:text-4xl text-2xl font-medium pb-10 text-nowrap">
          <h3>Browser By Category</h3>
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
        className="flex w-full space-x-7 flex-nowrap overflow-x-auto overflow-y-hidden"
        ref={cardsRef}
        style={{ scrollbarWidth: "none" }}
      >
        {productData.map((items) => (
          <div
            className="py-8 px-12  border-2 rounded flex flex-col justify-center items-center cursor-pointer"
            key={items.id}
          >
            <img src={items.image} alt="" className="pb-2 " />
            <h1>{items.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
