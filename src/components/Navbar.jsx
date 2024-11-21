import { Link } from "react-router-dom";
import Vector from "../assets/icons/Vector.png";
import Cart1 from "../assets/icons/Cart1.png";
import { useState, useRef, useContext, useEffect } from "react";
import Wishlisticon from "../assets/svg/Wishlisticon";
import Carticon from "../assets/svg/Carticon";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import user from "../assets/icons/User.svg";
import mallbag from "../assets/icons/Mallbag.svg";
import cancel from "../assets/icons/cancel.svg";
import logout from "../assets/icons/Logout.svg";
import review from "../assets/icons/Reviews.svg";
import ExclusiveContext from "../context/ExclusiveContext";
import { getAuth, signOut } from "firebase/auth";
import OustsideClick from "./OustsideClick";
import Swal from "sweetalert2";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { userId } = useContext(ExclusiveContext);
  const wrapperRef = useRef(null);
  const auth = getAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const userMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const handleClose = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  //usermenu close automatically when i click outside
  OustsideClick(wrapperRef, () => setIsUserMenuOpen(false));

  // Logout
  const handleLogout = () => {
    if (userId) {
      signOut(auth)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Successfully Logout",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          // An error happened.
        });
    }
  };

  return (
    <nav className="border-b-2 md:px-10 pt-5 pb-2 ssm:px-10">
      <div className="flex flex-col ssm:flex-row md:justify-between md:items-center justify-between items-center gap-5">
        <div className="flex md:flex-col lg:flex-row justify-around ssm:w-10 md:w-1/2">
          <div className="">
            <h3 className="InterFont font-bold md:text-2xl text-xl">
              Exclusive
            </h3>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex PoppinsFont text-base xlg:gap-12 md:space-x-3 ">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex w-1/2 justify-center items-center md:gap-3 lg:gap-5 gap-5">
          <form className="lg:w-90 md:w-90    bg-light-greyy border-none rounded-2 px-3 py-2">
            <div className="flex items-center gap-8 md:flex lg:flex">
              <label htmlFor="search">
                <img src={Vector} alt="search icon" />
              </label>
              <input
                type="text"
                placeholder="Search.."
                id="search"
                name="search"
                className="outline-none bg-inherit md:w-3/4 "
              />
            </div>
          </form>
          <div className="hidden md:flex items-center md:gap-2 lg:gap-5">
            <div className="Wishlist">
              <Link to="/wishlist">
                <Wishlisticon />
              </Link>
            </div>
            <div className="Cart">
              <Link to="/cart">
                <Carticon />
              </Link>
            </div>
            <div className="relative inline-block text-left" ref={wrapperRef}>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full ${
                  isUserMenuOpen ? "bg-red-500" : "bg-none"
                }`}
              >
                <FaRegUser
                  className="w-6 h-6 cursor-pointer"
                  onClick={userMenu}
                />
              </div>
              <div
                className={`${
                  isUserMenuOpen ? "block" : "hidden"
                }  absolute right-0 z-10 mt-2 w-56 UserMenu origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
                onClick={handleClose}
              >
                <div className="py-1" role="none">
                  {userId ? (
                    <Link
                      to="/"
                      className="flex gap-4 items-center  px-4 py-2 text-sm PoppinsFont text-white"
                    >
                      <img src={user} alt="" />
                      Manage My Account
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="flex gap-4 items-center  px-4 py-2 text-sm PoppinsFont text-white"
                    >
                      <img src={user} alt="" />
                      Login Account
                    </Link>
                  )}

                  <Link
                    to="/"
                    className="flex gap-4 items-center px-4 py-2 text-sm PoppinsFont text-white"
                  >
                    <img src={mallbag} alt="" />
                    My Order
                  </Link>
                  <Link
                    to="/"
                    className="flex gap-4 items-center px-4 py-2 text-sm PoppinsFont text-white"
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
                  {/* <Link
                    to="/"
                    className="flex gap-4 items-center px-4 py-2 text-sm PoppinsFont text-white"
                  >
                    <img src={logout} alt="" />
                    Logout
                  </Link> */}
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <button className="menu-button" onClick={toggleMenu}>
              <GiHamburgerMenu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div
        className={`mobile-menu ${isMenuOpen ? "block" : "hidden"} md:hidden`}
      >
        <ul className="flex flex-col items-center  group">
          <li className="p-2">
            <Link to="/home" className="group-hover:text-blue-500">
              Home
            </Link>
          </li>
          <li className="p-2">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="p-2">
            <Link to="/about">About</Link>
          </li>
          {!userId && (
            <li className="p-2">
              <Link to="/signup">Sign Up</Link>
            </li>
          )}
          <li className="p-2">
            <Link to="/wishlist">
              <Wishlisticon />
            </Link>
          </li>
          <li className="p-2">
            <Link to="/cart">
              <img src={Cart1} alt="Cart" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
