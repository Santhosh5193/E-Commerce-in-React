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
import hearticon from "../assets/icons/Hearticon.svg";
import heartwishlisticon from "../assets/icons/wishlisthearticon.svg";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { userId, setUserId, wishlistProductIds, cartlistProducts } =
    useContext(ExclusiveContext);
  const [isWishlistlength, setIsWishlistlength] = useState(0);
  const [isCartlistlength, setIsCartlistlength] = useState(0);
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
      setUserId(null);
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
  useEffect(() => {
    const wishlistitems = wishlistProductIds.length;
    setIsWishlistlength(wishlistitems);
  }, [wishlistProductIds]);

  useEffect(() => {
    const cartlistitems = cartlistProducts.length;
    setIsCartlistlength(cartlistitems);
  }, [cartlistProducts]);

  return (
    <nav className="border-b-2 sm:px-10 pt-5 pb-2 px-5">
      <div className="flex justify-evenly lg:justify-between md:justify-evenly md:items-center sm:justify-between items-center gap-5">
        <div className="flex justify-around ssm:w-10 md:w-1/2 md:gap-3">
          <div className="">
            <h3 className="InterFont font-bold md:text-2xl sm:text-xl text-base">
              Exclusive
            </h3>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex PoppinsFont text-base xlg:gap-12 md:space-x-3 lg:space-x-10 md:text-sm mmd:text-base lg:text-lg">
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

        <div className="flex justify-center items-center md:gap-3 lg:gap-5 gap-5">
          <form className="w-full sm:w-[243px] sm:h-[38px] h-[35px] bg-light-greyy border-none rounded-2 flex items-center justify-center md:px-3 px-2 py-2">
            <label
              htmlFor="search"
              className="flex justify-center items-center"
            >
              <img
                src={Vector}
                alt="search icon"
                className="md:w-5 md:h-5 w-4 h-4 mr-2"
              />
            </label>
            <input
              type="text"
              placeholder="Search.."
              id="search"
              name="search"
              className="hidden sm:block outline-none bg-inherit md:pl-8 w-full h-full"
            />
            <input
              type="text"
              id="search"
              name="search"
              className="block sm:hidden outline-none bg-inherit w-full h-full"
            />
          </form>
          <div className="hidden md:flex items-center md:gap-2 lg:gap-5 gap-2">
            <div className="Wishlist relative flex items-center">
              <div className="">
                <Link to="/wishlist">
                  <Wishlisticon className="w-10 h-10" />
                </Link>
              </div>
              {isWishlistlength !== 0 && (
                <span className="absolute bg-red-400 top-[-5px] left-[-5px] rounded-full w-5 h-5 flex items-center justify-center md:text-xs text-white font-semibold">
                  {isWishlistlength}
                </span>
              )}
            </div>
            <div className="Cart relative">
              <Link to="/cart">
                <Carticon />
              </Link>
              {isCartlistlength !== 0 && (
                <span className="absolute bg-red-400 top-[-5px] left-[-5px] rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-semibold">
                  {isCartlistlength}
                </span>
              )}
            </div>
            <div
              className="relative md:inline-block text-left"
              ref={wrapperRef}
            >
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
              <GiHamburgerMenu className="w-5 h-5" />
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
            <div className="Wishlist relative flex items-center">
              <div className="">
                <Link to="/wishlist">
                  <Wishlisticon className="w-10 h-10" />
                </Link>
              </div>
              {isWishlistlength !== 0 && (
                <span className="absolute bg-red-400 top-[-5px] left-[-5px] rounded-full w-5 h-5 flex items-center justify-center md:text-xs text-white font-semibold">
                  {isWishlistlength}
                </span>
              )}
            </div>
          </li>
          <li className="p-2">
            <div className="Cart relative">
              <Link to="/cart">
                <Carticon />
              </Link>
              {isCartlistlength !== 0 && (
                <span className="absolute bg-red-400 top-[-5px] left-[-5px] rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-semibold">
                  {isCartlistlength}
                </span>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
