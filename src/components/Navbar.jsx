import { Link } from "react-router-dom";
import Vector from "../assests/icons/Vector.png";
import Wishlist from "../assests/icons/Wishlist.png";
// import { ReactComponent as Wishlist } from "../assests/icons/Vector.svg";
import Cart1 from "../assests/icons/Cart1.png";
import { useState } from "react";
import Wishlisticon from "../assests/svg/wishlisticon";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b-2 md:px-10 pt-5 pb-2 ">
      <div className="flex flex-col ssm:flex-row md:justify-between justify-evenly items-center gap-5">
        <div className="flex gap-5">
          <h3 className="InterFont md:text-2xl text-xl">Exclusive</h3>

          <div className="hidden md:flex gap-x-11 md:gap-x-11 items-center">
            <ul className="flex PoppinsFont text-base lg:gap-12 md:gap-5">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex  items-center md:gap-3 lg:gap-5 gap-5">
          <form className="lg:w-96 md:w-90   bg-light-greyy border-none rounded-2 px-3 py-2">
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
          <div className="hidden md:flex md:gap-2 lg:gap-5">
            <div className="Wishlist">
              <img src={Wishlist} alt="Wishlist" />
              {/* <Wishlist /> */}
              {/* <Wishlisticon /> */}
            </div>
            <div className="Cart">
              <img src={Cart1} alt="Cart" />
            </div>
          </div>

          <div className="md:hidden">
            <button className="menu-button" onClick={toggleMenu}>
              <img src={Vector} alt="Menu" />
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
          <li className="p-2">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="p-2">
            <Link to="/wishlist">
              {/* <img src={Wishlist} alt="Wishlist" /> */}
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
