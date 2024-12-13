import { Link, Outlet } from "react-router-dom";
import Profileicon from "../../assets/icons/Profileicon.svg";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import ExclusiveContext from "../../context/ExclusiveContext";
import Myordersicon from "../../assets/icons/Myorders.svg";
import RightAngularicon from "../../assets/icons/RightAngularicon.svg";
import UserIcon from "../../assets/icons/UserIcon.svg";
import LogoutIcon from "../../assets/icons/Logouticon.svg";

function Profileinfo() {
  const { userId } = useContext(ExclusiveContext);
  const [userlist, setUserList] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const cartRef = await getDocs(collection(db, "users"));
        const usersList = cartRef.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const getid = usersList.find((item) => item.id === userId);
        setUserList(getid);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleClick = (e) => {
    let a = e.target.id;
    setSelectedGender(a);
  };

  return (
    <>
      <h2 className="md:text-xl text-base sm:text-lg font-semibold md:pb-5 pb-2 text-nowrap">
        Personal Information
      </h2>
      <div div className="flex space-x-10 pb-5">
        <input
          type="text"
          placeholder={userlist?.name}
          className="border-2 sm:w-[80%] lg:w-[50%] px-3 w-full py-1 ssm:py-2 sm:text-xl"
        />
        {userlist?.lastname && (
          <input
            type="text"
            placeholder="Last Name"
            className="border-2 w-1/2  px-2"
          />
        )}
      </div>
      <h2 className="text-base sm:text-lg font-semibold pb-2">Your Gender</h2>
      <div className="flex sm:gap-10 gap-5 pb-5">
        <div className="flex gap-2">
          <input
            type="radio"
            name="gender"
            checked={selectedGender === "male"}
            id="male"
            onChange={handleClick}
          />
          <label htmlFor="male" className="sm:text-lg">
            Male
          </label>
        </div>
        <div className="flex gap-2">
          <input
            type="radio"
            name="gender"
            id="female"
            checked={selectedGender === "female"}
            onChange={handleClick}
          />
          <label htmlFor="female" className="sm:text-lg ">
            Female
          </label>
        </div>
      </div>
      <h2 className="text-base sm:text-lg  font-semibold pb-3">
        Email Address
      </h2>
      <input
        type="email"
        name=""
        placeholder={userlist?.email}
        className="border-2 sm:w-[80%] lg:w-[50%] px-3 w-full py-1 ssm:py-2 sm:text-xl"
      />

      <h2 className=" text-lg font-semibold pb-3">Mobile Number</h2>
      <input
        type="number"
        name=""
        placeholder={userlist?.mobileNumber}
        className="border-2 w-full sm:w-[80%] lg:w-[50%]  py-1 ssm:py-2 sm:text-xl px-3"
      />
    </>
  );
}

export default Profileinfo;
