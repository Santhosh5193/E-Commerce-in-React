import { useEffect, useState } from "react";
import Star from "./../assets/FlashSales/images/star.svg";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Wishlisticon from "../assets/svg/Wishlisticon";
import Viewicon from "../assets/svg/Viewicon";
import { Link } from "react-router-dom";

function Products() {
  const [productData, setProductData] = useState([]);

  //Fetch data from firebase
  useEffect(() => {
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
  }, []);

  return (
    <div className="p-5">
      <div className="cards flex justify-center items-start flex-wrap gap-10">
        {productData.map((product) => (
          <div key={product.id}>
            <div className=" card-1 relative w-[270px] h-[340px] rounded-md border-2">
              <div className="card-head border-b-2  h-[250px] flex justify-center items-center ">
                <img
                  src={product.image[0]}
                  alt=""
                  className="w-[80%] h-[70%] object-contain"
                />
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
                          {product.offer}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="star flex gap-2 py-1">
                    {product?.ratings.map((star) => (
                      <img src={Star} key={star} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
