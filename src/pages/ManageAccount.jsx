import { Link } from "react-router-dom";
import Profileicon from "../assets/icons/Profileicon.svg";

function ManageAccount() {
  return (
    <section className="py-10 md:px-20 bg-[#f1f3f6]">
      <header>
        <h2 className="PoppinsFont md:mb-10 mb-5 px-5">
          <Link to="/"> Home</Link> /{" "}
          <span className="font-medium">My Profile</span>
        </h2>
      </header>
      <div className="flex space-x-10 h-[70vh] px-5">
        <div className="w-[30%] lg:w-[20%] flex flex-col space-y-10">
          <div className="shadow-md h-[10vh] px-2 bg-white flex items-center gap-3">
            <img src={Profileicon} alt="" />
            <div className="">
              <div className="">hello</div>
              <div className="">SK</div>
            </div>
          </div>
          <div className="shadow-md h-[55vh] bg-white">hii</div>
        </div>
        <div className=" w-[70%] lg:w-[80%]  shadow-md bg-white">
          <h2 className="">Personal Information</h2>
          <div className="flex">
            <input type="text" placeholder="santhosh" className="border-2" />
            <input type="text" placeholder="kumar" className="border-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ManageAccount;
