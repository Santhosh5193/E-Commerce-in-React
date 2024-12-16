import { Link, useNavigate } from "react-router-dom";
import Vector from "../assets/icons/Vector.png";
import { useState, useRef, useContext, useEffect } from "react";
import Wishlisticon from "../assets/svg/Wishlisticon";
import Carticon from "../assets/svg/Carticon";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";
import ExclusiveContext from "../context/ExclusiveContext";
import { getAuth, signOut } from "firebase/auth";
import OustsideClick from "./OustsideClick";
import UserMenu from "./UserMenu";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const {
    userId,
    setUserId,
    wishlistProductIds,
    cartlistProducts,
    productData,
    setFilteredProducts,
  } = useContext(ExclusiveContext);
  const [isWishlistlength, setIsWishlistlength] = useState(0);
  const [isCartlistlength, setIsCartlistlength] = useState(0);
  const [searchText, setSearchText] = useState("");
  const wrapperRef = useRef(null);
  const auth = getAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //usermenu close automatically when i click outside
  OustsideClick(wrapperRef, () => setIsUserMenuOpen(false));

  useEffect(() => {
    const wishlistitems = wishlistProductIds.length;
    setIsWishlistlength(wishlistitems);
  }, [wishlistProductIds]);

  useEffect(() => {
    const cartlistitems = cartlistProducts.length;
    setIsCartlistlength(cartlistitems);
  }, [cartlistProducts]);

  const hadleSearchlist = (e) => {
    const input = e.target.value.toUpperCase();
    setSearchText(e.target.value);
    if (input) {
      const results = productData.filter((product) =>
        product.productName.toUpperCase().includes(input)
      );
      setFilteredProducts(results);
      navigate("/SearchList");
    } else {
      setFilteredProducts([]);

      navigate("/home");
    }
  };

  useEffect(() => {
    if (location.pathname !== "/SearchList") {
      setSearchText("");
    }
  }, [navigate]);

  const userMenuIcon = () => {
    navigate("/myaccount/profileInformation");
    setIsMenuOpen(false);
  };
  return (
    <nav className="border-b-2 sm:px-10 pt-5 pb-2 px-5">
      <div className="flex justify-evenly lg:justify-between md:justify-evenly md:items-center sm:justify-between items-center gap-5">
        <div className="flex justify-betwwen ssm:w-10 md:w-1/2 md:gap-10">
          <h3 className="InterFont font-bold md:text-2xl sm:text-xl text-base">
            <Link to="/home"> Exclusive</Link>
          </h3>
          <ul className="PoppinsFont text-base md:text-sm mmd:text-base lg:text-lg hidden lg:flex items-center space-x-10">
            <li>
              <Link to="/home">Home</Link>
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

        <div className="flex justify-center items-center md:gap-3 lg:gap-5 gap-5">
          <form className="bg-light-greyy border-none rounded-2 flex items-center justify-center md:px-3 px-2 py-2">
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
              value={searchText}
              placeholder="Search.."
              id="search"
              name="search"
              className="outline-none bg-inherit w-full h-full"
              onChange={hadleSearchlist}
            />
          </form>
          <div className="hidden lg:flex items-center md:gap-2 lg:gap-5 gap-2">
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
            <UserMenu />
          </div>

          <div className="lg:hidden">
            <button
              className="menu-button"
              onClick={toggleMenu}
              aria-label="menu-buuton"
            >
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
            <Link
              to="/home"
              className="group-hover:text-blue-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="p-2">
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li className="p-2">
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
          </li>
          {!userId && (
            <li className="p-2">
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </li>
          )}
          <li className="flex items-center space-x-3">
            <div className="Wishlist relative flex items-center">
              <div>
                <Link to="/wishlist" onClick={() => setIsMenuOpen(false)}>
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
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <Carticon />
              </Link>
              {isCartlistlength !== 0 && (
                <span className="absolute bg-red-400 top-[-5px] left-[-5px] rounded-full w-5 h-5 flex items-center justify-center text-xs text-white font-semibold">
                  {isCartlistlength}
                </span>
              )}
            </div>
            {/* <UserMenu setIsMenuOpen={isMenuOpen} /> */}
            <UserMenu
              onClick={() => navigate("/myaccount/profileInformation")}
            />
            {/* <FaRegUser
              className="w-6 h-6 cursor-pointer"
              onClick={userMenuIcon}
            /> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
