import { Link, Outlet, useNavigate } from "react-router-dom";
import Profileicon from "../../assets/icons/Profileicon.svg";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useCallback, useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import ExclusiveContext from "../../context/ExclusiveContext";
import Myordersicon from "../../assets/icons/Myorders.svg";
import RightAngularicon from "../../assets/icons/RightAngularicon.svg";
import UserIcon from "../../assets/icons/UserIcon.svg";
import LogoutIcon from "../../assets/icons/Logouticon.svg";
import Swal from "sweetalert2";
import { getAuth, signOut } from "@firebase/auth";

function ManageAccount() {
  const { userId, userlist, setUserId } = useContext(ExclusiveContext);
  const auth = getAuth();
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    if (userId) {
      setUserId(null);
      signOut(auth)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Successfully Logout",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/home");
        })
        .catch((error) => {
          // An error happened.
        });
    }
  };

  return (
    <section className="py-10 md:px-10 px-5 bg-[#f1f3f6] ">
      <header className="md:mb-10 mb-5 md:px-5 flex justify-between items-center">
        <h2 className="PoppinsFont ">
          <Link to="/"> Home</Link> /
          <span className="font-medium">My Profile</span>
        </h2>
        <div
          className="flex items-center gap-2 cursor-pointer sm:hidden border-2 px-2 py-1"
          onClick={handleLogout}
        >
          <img src={LogoutIcon} alt="LogoutIcon" className="w-5" />
          <h2 className="hidden sssm:block font-medium  ssm:text-base">
            Log Out
          </h2>
        </div>
      </header>

      <div className=" sm:flex md:space-x-10 space-y-5 sm:space-y-0 sm:space-x-5 md:h-[70vh] md:px-5 w-full">
        <div className=" sm:block sm:w-[40%] md:w-[30%] lg:w-[20%] ">
          <div className="flex flex-col md:space-y-10 space-y-5">
            <div className="shadow-md h-[10vh] px-2 bg-white flex items-center gap-3">
              <img src={Profileicon} alt="" />
              <div className="">
                <div className="text-sm">hello</div>
                <div className="font-semibold text-lg">{userlist[0]?.name}</div>
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="md:h-[55vh] max-h-[57.5vh] bg-white flex flex-col">
                <Link to="/myaccount/profileInformation">
                  <div className="flex items-center gap-2 px-5">
                    <img src={UserIcon} alt="UserIcon" className="w-5" />
                    <h2 className="text-base font-medium py-3 ">
                      Profile Info
                    </h2>
                  </div>
                </Link>
                <div className="flex flex-col h-full">
                  <Link to="/myaccount/myOrders">
                    <div className="border-y-2 h-14 flex justify-between items-center px-5">
                      <div className="flex items-center gap-2 ">
                        <img
                          src={Myordersicon}
                          alt="Myordersicon"
                          className="md:w-5 w-4 h-5"
                        />
                        <p className="uppercase font-medium textsm sm:text-base text-nowrap">
                          My Orders
                        </p>
                      </div>
                      <div className="">
                        <img
                          src={RightAngularicon}
                          alt="RightAngularicon"
                          className="w-2"
                        />
                      </div>
                    </div>
                  </Link>
                  <div
                    className="flex items-center gap-2 px-5 mt-auto border-t-2 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <img src={LogoutIcon} alt="LogoutIcon" className="w-5" />
                    <h2 className="text-base font-medium py-3">Log Out</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:hidden flex flex-wrap sssm:flex-nowrap gap-5">
              <div className="border-2 w-full sssm:w-1/2">
                <Link to="/myaccount/profileInformation">
                  <div className="flex items-center gap-2 px-5">
                    <img src={UserIcon} alt="UserIcon" className="w-5" />
                    <h2 className="text-base font-medium py-3 text-nowrap ">
                      Profile Info
                    </h2>
                  </div>
                </Link>
              </div>
              <div className="border-2 w-full sssm:w-1/2">
                <Link to="/myaccount/myOrders">
                  <div className="h-14 flex justify-between items-center px-3">
                    <div className="flex items-center gap-2 ">
                      <img
                        src={Myordersicon}
                        alt="Myordersicon"
                        className="md:w-5 w-4 h-5"
                      />
                      <p className="uppercase font-medium textsm sm:text-base text-nowrap">
                        My Orders
                      </p>
                    </div>
                    <div className="">
                      <img
                        src={RightAngularicon}
                        alt="RightAngularicon"
                        className="w-2"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%] sm:w-[60%] md:w-[70%] lg:w-[80%] md:mx-10 shadow-md bg-white p-5 sm:p-10">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

export default ManageAccount;
