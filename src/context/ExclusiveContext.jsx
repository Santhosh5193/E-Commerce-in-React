import { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
  collection,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const ExclusiveContext = createContext();

export const ContextProvider = ({ children }) => {
  const [productView, setProductView] = useState("");
  const [productData, setProductData] = useState([]);
  // const [cartlistProducts, setCartlistProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [setIncrement, isSetIncrement] = useState(1);
  const [userId, setUserId] = useState("");
  const auth = getAuth();
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Fetch and set the user ID when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log("User ID (UID):", user.uid);
        setUserId(user.uid);
      } else {
        // console.log("No user is signed in.");
        setUserId("");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // Count down
  // useEffect(() => {
  //   const endTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000;

  //   const calculateTimeLeft = () => {
  //     const currentTime = new Date().getTime();
  //     const difference = endTime - currentTime;

  //     if (difference > 0) {
  //       setTimeLeft({
  //         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
  //         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
  //         minutes: Math.floor((difference / (1000 * 60)) % 60),
  //         seconds: Math.floor((difference / 1000) % 60),
  //       });
  //     }
  //   };

  //   const interval = setInterval(calculateTimeLeft, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  //Fetch data from firebase
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products"));
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(products);
        setProductData(products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, []);

  // // Fetch cartlist data from firebase
  // useEffect(() => {
  //   const fetchCartData = async () => {
  //     try {
  //       const querySnapshot = await getDocs(collection(db, "Cartlist"));
  //       const Cartlistproducts = querySnapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       // console.log(Cartlistproducts);

  //       setCartlistProducts(Cartlistproducts);
  //     } catch (error) {
  //       console.error("Error fetching product data:", error);
  //     }
  //   };

  //   fetchCartData();
  // }, []);

  //Fetch wishlist data from firebase
  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Wishlist"));
        const Wishlistproducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(Cartlistproducts);
        setWishlistProducts(Wishlistproducts);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchWishlistData();
  }, []);

  return (
    <ExclusiveContext.Provider
      value={{
        productView,
        setProductView,
        userId,
        setUserId,
        timeLeft,
        setProductView,
        productData,
        // cartlistProducts,
        // setCartlistProducts,
        setIncrement,
        isSetIncrement,
      }}
    >
      {children}
    </ExclusiveContext.Provider>
  );
};

export default ExclusiveContext;
