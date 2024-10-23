function Navb() {
  return (
    // <nav clasName="bg-white border-gray-200 dark:bg-gray-900">
    //   <div clasName="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <a
    //       href="https://flowbite.com/"
    //       clasName="flex items-center space-x-3 rtl:space-x-reverse"
    //     >
    //       <img
    //         src="https://flowbite.com/docs/images/logo.svg"
    //         clasName="h-8"
    //         alt="Flowbite Logo"
    //       />
    //       <span clasName="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
    //         Flowbite
    //       </span>
    //     </a>
    //     <button
    //       data-collapse-toggle="navbar-default"
    //       type="button"
    //       clasName="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //       aria-controls="navbar-default"
    //       aria-expanded="false"
    //     >
    //       <span clasName="sr-only">Open main menu</span>
    //       <svg
    //         clasName="w-5 h-5"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 17 14"
    //       >
    //         <path
    //           stroke="currentColor"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           d="M1 1h15M1 7h15M1 13h15"
    //         />
    //       </svg>
    //     </button>
    //     <div clasName="hidden w-full md:block md:w-auto" id="navbar-default">
    //       <ul clasName="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //         <li>
    //           <a
    //             href="#"
    //             clasName="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    //             aria-current="page"
    //           >
    //             Home
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             clasName="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             About
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             clasName="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Services
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             clasName="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Pricing
    //           </a>
    //         </li>
    //         <li>
    //           <a
    //             href="#"
    //             clasName="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    //           >
    //             Contact
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </nav>

    <nav className="border-b-2 px-5 py-3">
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
              <img src={burgerIcon} alt="Menu" />
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

export default Navb;
