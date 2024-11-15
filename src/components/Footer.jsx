import fbicon from "../assets/icons/fbicon.png";
import insta from "../assets/icons/insta.png";
import twitter from "../assets/icons/twitter.png";
import linkedin from "../assets/icons/in.png";
import mailsend from "../assets/icons/mailsend.png";
import QrCode from "../assets/icons/Qrcode.svg";
import Appstore from "../assets/icons/AppStore.svg";
import Googlestore from "../assets/icons/GooglePlay.svg";

function Footer() {
  return (
    <div className="flex flex-wrap justify-evenly bg-black pl-8 sm:px-8 py-6 md:flex max-[530px]:px-10">
      <div className="first w-full items-center ssm:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 mb-8">
        <h3 className="text-light-white text-2xl InterFont font-bold mb-2">
          Exclusive
        </h3>
        <h4 className="text-light-white PoppinsFont font-semibold">
          Subscribe
        </h4>
        <p className="text-light-white mt-2">Get 10% off your first order</p>
        <div className="flex items-center my-4 border-2 w-3/4">
          <input
            type="email"
            id="email"
            name="email"
            className="outline-none pl-3 bg-inherit text-white w-full"
            placeholder="Enter your email"
          />
          <label htmlFor="email" className="flex-none px-2 py-1">
            <img src={mailsend} alt="" />
          </label>
        </div>
      </div>
      <div className="second w-full ssm:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 mb-8">
        <ul className="text-light-white">
          <li className="PoppinsFont font-semibold">Support</li>
          <li className="fooText">
            No.44c, Br street,dh1515,
            <br /> Bangalore.
          </li>
          <li className="fooText">exclusive@gmail.com</li>
          <li className="fooText">+56565-565656</li>
        </ul>
      </div>
      <div className="third w-full ssm:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 mb-8">
        <ul className="text-light-white">
          <li className="PoppinsFont font-semibold">Account</li>
          <li className="fooText">My Account</li>
          <li className="fooText">Login / Register</li>
          <li className="fooText">Cart</li>
          <li className="fooText">Wishlist</li>
          <li className="fooText">Shop</li>
        </ul>
      </div>
      <div className="fourth w-full ssm:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 mb-8">
        <ul className="text-light-white">
          <li className="PoppinsFont font-semibold">Quick Link</li>
          <li className="fooText">Privacy Policy</li>
          <li className="fooText">Trems Of Use</li>
          <li className="fooText">FAQ</li>
          <li className="fooText">Contact</li>
        </ul>
      </div>
      <div className="last w-full ssm:w-1/2 sm:w-1/3 md:w-1/3 lg:w-1/5 mb-8">
        <h3 className="text-light-white PoppinsFont font-semibold">Donwload</h3>
        <p className="text-light-white fooText pb-2">
          Save $3 with App New User Only
        </p>
        <div className="flex gap-3">
          <img src={QrCode} alt="" />
          <div className="flex flex-col gap-1">
            <img src={Appstore} alt="" />
            <img src={Googlestore} alt="" />
          </div>
        </div>
        <ul className="flex gap-5 mt-4">
          <li>
            <img className="" src={fbicon} alt="" />
          </li>
          <li>
            <img src={insta} alt="" />
          </li>
          <li>
            <img src={twitter} alt="" />
          </li>
          <li>
            <img src={linkedin} alt="" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
