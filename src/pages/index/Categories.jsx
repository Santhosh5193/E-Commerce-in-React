import { useContext, useEffect, useRef, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import rightArrow from "../../assets/FlashSales/images/Arrowright.svg";
import leftArrow from "../../assets/FlashSales/images/Arrowleft.svg";
import { useNavigate } from "react-router-dom";
import ExclusiveContext from "../../context/ExclusiveContext";

function Categories() {
  const [productCategeoryData, setProductCategeoryData] = useState([]);
  const { setSeachCategory, productData, userId, setFilteredProducts } =
    useContext(ExclusiveContext);
  const navigate = useNavigate();

  //Fetch data from firebase
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Category"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductCategeoryData(products);
      } catch (error) {
        console.error(
          "Error fetching product data:",
          error.message,
          error.code
        );
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
      const scrollAmount = containerWidth * 0.5; // 20% of the container width
      cardsRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (cardsRef.current) {
      const containerWidth = cardsRef.current.offsetWidth;
      const scrollAmount = containerWidth * 0.5; // 20% of the container width
      cardsRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleCategerySearch = (name) => {
    setSeachCategory(name);
    if (name) {
      const results = productData.filter((product) =>
        product.category.includes(name)
      );
      setFilteredProducts(results);
      navigate("/SearchList");
    } else {
      setFilteredProducts([]);
      navigate("/home");
    }
  };

  return (
    <div className="py-8 border-b-2">
      <div className="head flex gap-3 items-center pb-5">
        <div className="sm:h-10 h-7 w-2 sm:w-5 bg-secondary rounded-md"></div>
        <h3 className="text-red-600 PoppinsFont font-semibold">Categories's</h3>
      </div>
      <div className=" flex justify-between">
        <div className="Title InterFont md:text-4xl sm:text-2xl font-medium pb-10 text-nowrap">
          <h3>Browser By Category</h3>
        </div>
        <div className="arrows flex gap-3  ">
          <div
            className="bg-gray-200 sm:w-9 sm:h-9 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={scrollLeft}
          >
            <div className="sm:w-8 sm:h-8 w-5 h-5 flex justify-center items-center">
              <img src={leftArrow} alt="leftarrow" className="w-5 sm:w-full" />
            </div>
          </div>
          <div
            className="bg-gray-200 sm:w-9 sm:h-9 w-6 h-6 rounded-full flex items-center justify-center"
            onClick={scrollRight}
          >
            <div className="sm:w-8 sm:h-8 w-5 h-5 flex justify-center items-center">
              <img
                src={rightArrow}
                alt="rightarrow"
                className="w-5 sm:w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex w-full space-x-7 flex-nowrap overflow-x-auto overflow-y-hidden "
        ref={cardsRef}
        style={{ scrollbarWidth: "none" }}
      >
        {productCategeoryData.map((items) => (
          <div
            className="md:h-36 md:w-48 sm:w-40 sm:h-32 w-36 h-32 border-2 rounded flex flex-col justify-center items-center cursor-pointer"
            key={items.id}
            style={{ flexShrink: 0 }}
            onClick={() => handleCategerySearch(items.name)}
          >
            <img
              src={items.image}
              alt={items.name}
              className="md:h-16 h-10 sm:w-16 object-contain"
            />
            <h1 className="text-center sm:text-lg text-base mt-2">
              {items.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
