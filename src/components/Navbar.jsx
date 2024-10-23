import { Link } from "react-router-dom";
import Vector from "../assests/icons/Vector.png";
import Wishlist from "../assests/icons/Wishlist.png";
import Cart1 from "../assests/icons/Cart1.png";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-b-2 px-28 pt-5 pb-2">
      <div className="flex justify-between items-center">
        <h3 className="InterFont text-2xl">Exclusive</h3>

        <div className="hidden md:flex gap-x-11 items-center">
          <ul className="flex PoppinsFont text-base gap-12">
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
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
          <div className="Wishlist">
            <img src={Wishlist} alt="Wishlist" />
          </div>
          <div className="Cart">
            <img src={Cart1} alt="Cart" />
          </div>
        </div>

        <div className="flex items-center">
          <form className="searchbar bg-light-greyy border-none rounded-2 px-3 py-2">
            <div className="flex items-center gap-8">
              <label htmlFor="search">
                <img src={Vector} alt="search icon" />
              </label>
              <input
                type="text"
                placeholder="Search.."
                id="search"
                name="search"
                className="outline-none bg-inherit w-3/4"
              />
            </div>
          </form>

          {/* Burger menu */}
          <div className="md:hidden">
            <button className="menu-button" onClick={toggleMenu}>
              <img src={Vector} alt="Menu" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${isMenuOpen ? "block" : "hidden"} md:hidden`}
      >
        <ul className="flex flex-col gap-4">
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
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/wishlist">
              <img src={Wishlist} alt="Wishlist" />
            </Link>
          </li>
          <li>
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
