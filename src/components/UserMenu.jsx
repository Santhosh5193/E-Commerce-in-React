import { useContext, useRef, useState } from "react";
import ExclusiveContext from "../context/ExclusiveContext";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import OustsideClick from "./OustsideClick";
import user from "../assets/icons/User.svg";
import mallbag from "../assets/icons/Mallbag.svg";
import cancel from "../assets/icons/Cancel.svg";
import logout from "../assets/icons/Logout.svg";
import review from "../assets/icons/Reviews.svg";
import Swal from "sweetalert2";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";

function UserMenu(setIsMenuOpen) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { userId, setUserId } = useContext(ExclusiveContext);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const userMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleClose = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  OustsideClick(wrapperRef, () => setIsUserMenuOpen(false));

  // Logout
  const handleLogout = () => {
    if (userId) {
      setUserId(null);
      signOut(auth).then(() => {
        Swal.fire({
          icon: "success",
          title: "Successfully Logout",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/home");
      });
      // .catch((error) => {
      //   console.log();

      // });
    }
  };

  return (
    <div className="relative md:inline-block text-left" ref={wrapperRef}>
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${
          isUserMenuOpen ? "bg-red-500" : "bg-none"
        }`}
      >
        <FaRegUser className="w-6 h-6 cursor-pointer" onClick={userMenu} />
      </div>
      <div
        className={`${
          isUserMenuOpen ? "block" : "hidden"
        }  absolute right-0 sm:left-auto sm:right-0 left-1/2 transform sm:translate-x-0 -translate-x-1/2 z-10 mt-2 w-56 UserMenu origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
        onClick={handleClose}
      >
        <div className="py-1" role="none">
          {userId ? (
            <Link
              to="/myaccount/profileInformation"
              className="flex gap-4 items-center  px-4 py-2 text-sm PoppinsFont text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={user} alt="" />
              Manage My Account
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex gap-4 items-center  px-4 py-2 text-sm PoppinsFont text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src={user} alt="" />
              Login Account
            </Link>
          )}

          <Link
            to="/"
            className="flex gap-4 items-center px-4 py-2 text-sm PoppinsFont text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={mallbag} alt="" />
            My Order
          </Link>
          <Link
            to="/"
            className="flex gap-4 items-center px-4 py-2 text-sm PoppinsFont text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            <img src={cancel} alt="" />
            My Cancellation
          </Link>
          <Link
            to="/"
            className="flex gap-4 items-center px-4 py-2 text-sm PoppinsFont text-white"
          >
            <img src={review} alt="" />
            My Review
          </Link>
          {userId && (
            <div
              className="flex gap-4 items-center px-4 py-2 text-sm PoppinsFont text-white cursor-pointer"
              onClick={handleLogout}
            >
              <img src={logout} alt="" />
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserMenu;
