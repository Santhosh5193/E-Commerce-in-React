import Aboutimage from "../assets/images/AboutImage.png";
import service1 from "../assets/icons/AboutService1.svg";
import service2 from "../assets/icons/AboutService2.svg";
import service3 from "../assets/icons/AboutService3.svg";
import service4 from "../assets/icons/AboutService4.svg";
import Instagram from "../assets/icons/Instagram.svg";
import Linkedin from "../assets/icons/Linkedin.svg";
import Twitter from "../assets/icons/Twitter.svg";
import Image1 from "../assets/images/AboutCarousel1.png";
import Services from "./../assets/icons/Services.svg";
import Services1 from "./../assets/icons/Services1.svg";
import Services2 from "./../assets/icons/Services2.svg";
import { Link } from "react-router-dom";

function Aboutpage() {
  return (
    <div className="md:py-10 md:px-16 px-10 py-5">
      <section>
        <header>
          <h2 className="">
            <Link to="/"> Home</Link> /{" "}
            <span className="font-medium">About</span>
          </h2>
        </header>
        <div className="md:flex md:h-[80vh]">
          <div className="md:w-1/2 h-full md:p-16 md:pt-0 py-5 flex flex-col justify-center">
            <h1 className="InterFont font-semibold md:text-5xl text-3xl mb-5">
              Our Story
            </h1>
            <p className="PoppinsFont font-normal lg:text-base text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              blanditiis consequuntur. Odio repellat ipsam obcaecati. Sequi id
              sunt dolore. Dicta mollitia qui exercitationem a recusandae
              eveniet esse cum odit est rerum tempore eveniet. Harum dicta
              dolore provident sapiente iure nihil modi doloremque praesentium.
            </p>
            <p className="PoppinsFont lg:text-base text-sm pt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
              aliquid iusto possimus blanditiis veniam delectus assumenda
              perferendis officia. Ex excepturi delectus nobis laudantium
              impedit, ea ab.
            </p>
          </div>
          <div className="md:w-1/2 w-full h-full flex items-center justify-center p-0">
            <img
              src={Aboutimage}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <div className="mt-10  flex flex-wrap justify-evenly gap-y-4 gap-x-4">
        <div className="md:w-[270px] md:h-[230px] w-[200px] h-[160px] border-2 rounded flex flex-col justify-center items-center cursor-pointer">
          <img
            src={service1}
            alt=""
            className="pb-2 md:w-fit md:h-fit w-[70px] h-[70px]"
          />
          <h1 className="font-bold text-3xl InterFont">10.5K</h1>
          <p className="PoppinsFont text-base ">Sallers active our site</p>
        </div>
        <div
          className="md:w-[270px] md:h-[230px] w-[200px] h-[160px] border-2 rounded flex flex-col justify-center items-center cursor-pointer"
          style={{ background: "#DB4444" }}
        >
          <img
            src={service2}
            alt=""
            className="pb-2  md:w-fit md:h-fit w-[70px] h-[70px]  "
          />
          <h1 className="font-bold text-3xl InterFont">10.5K</h1>
          <p className="PoppinsFont text-base ">Sallers active our site</p>
        </div>
        <div className="md:w-[270px] md:h-[230px] w-[200px] h-[160px] border-2 rounded flex flex-col justify-center items-center cursor-pointer">
          <img
            src={service3}
            alt=""
            className="pb-2 md:w-fit md:h-fit w-[70px] h-[70px]"
          />
          <h1 className="font-bold text-3xl InterFont">10.5K</h1>
          <p className="PoppinsFont text-base ">Sallers active our site</p>
        </div>
        <div className="md:w-[270px] md:h-[230px] w-[200px] h-[160px] border-2 rounded flex flex-col justify-center items-center cursor-pointer">
          <img
            src={service4}
            alt=""
            className="pb-2 md:w-fit md:h-fit w-[70px] h-[70px]"
          />
          <h1 className="font-bold text-3xl InterFont">10.5K</h1>
          <p className="PoppinsFont text-base ">Sallers active our site</p>
        </div>
      </div>
      <div className="md:mt-16 mt-10 flex flex-wrap justify-evenly gap-y-4 ">
        <div className="md:text-left text-center justify-center md:justify-start">
          <img
            src={Image1}
            alt="Instagram-icon"
            className="lg:w-[340px] lg:h-[430px] w-[200px] h-[230px]"
          />
          <p className="InterFont font-medium lg:text-4xl text-2xl py-2">
            Tom Crouise
          </p>
          <p className="PoppinsFont text-sm lg:text-base pb-2">
            Founder & Chairman
          </p>
          <ul className="flex gap-3  justify-center md:justify-start">
            <li>
              <img src={Instagram} alt="" />
            </li>
            <li>
              <img src={Twitter} alt="" />
            </li>
            <li>
              <img src={Linkedin} alt="" />
            </li>
          </ul>
        </div>
        <div className="md:text-left text-center justify-center md:justify-start">
          <img
            src={Image1}
            alt="Instagram-icon"
            className="lg:w-[340px] lg:h-[430px] w-[200px] h-[230px]"
          />
          <p className="InterFont font-medium lg:text-4xl text-2xl py-2">
            Tom Crouise
          </p>
          <p className="PoppinsFont text-sm lg:text-base pb-2">
            Founder & Chairman
          </p>
          <ul className="flex gap-3 justify-center md:justify-start">
            <li>
              <img src={Instagram} alt="" />
            </li>
            <li>
              <img src={Twitter} alt="" />
            </li>
            <li>
              <img src={Linkedin} alt="" />
            </li>
          </ul>
        </div>
        <div className="md:text-left text-center justify-center md:justify-start">
          <img
            src={Image1}
            alt="Instagram-icon"
            className="lg:w-[340px] lg:h-[430px] w-[200px] h-[230px]"
          />
          <p className="InterFont font-medium lg:text-4xl text-2xl py-2">
            Tom Crouise
          </p>
          <p className="PoppinsFont text-sm lg:text-base pb-2">
            Founder & Chairman
          </p>
          <ul className="flex gap-3 justify-center md:justify-start">
            <li>
              <img src={Instagram} alt="" />
            </li>
            <li>
              <img src={Twitter} alt="" />
            </li>
            <li>
              <img src={Linkedin} alt="" />
            </li>
          </ul>
        </div>
      </div>
      <div className="PoppinsFont mt-10 sm:flex justify-evenly sm:space-y-0 space-y-6">
        <div className="flex flex-col items-center">
          <img src={Services} alt="Services" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 text-xl">FREE AND FAST DELIVERY </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src={Services1} alt="Services1" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 text-xl">FREE AND FAST DELIVERY </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <img src={Services2} alt="Services2" className="pb-3" />
          <div className="text-center">
            <h3 className="font-bold pb-1 text-xl">FREE AND FAST DELIVERY </h3>
            <p className="text-sm">Free delivery for all orders over $130</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutpage;
