import Phoneicon from "../assets/icons/Phone.svg";
import Mailicon from "../assets/icons/Mail.svg";

function Contact() {
  return (
    <div className="p-16 PoppinsFont">
      <header>
        <h2 className=" mb-10">
          Home / <span className="font-medium"> Contact</span>
        </h2>
      </header>
      <div className="gap-5 lg:flex space-y-5 md:flex-none ">
        <div className="lg:flex lg:flex-col lg:w-[40%] md:w-[100%] md:flex md:gap-10 lg:gap-0 sm:text-base md:text-sm lg:text-base w-full shadow-2xl p-16">
          <div className="PoppinsFont mb-7 border-b-2 md:border-r-2 md:border-b-0 lg:border-b-2 lg:border-r-0 md:pr-10 lg:pr-0">
            <div className="flex gap-5 items-center mb-6">
              <img src={Phoneicon} alt="" />
              <h2 className=" font-medium">Call To Us</h2>
            </div>
            <div className="">
              <p className="mb-4">We are Available 24/7, 7 days a week </p>
              <p className="mb-7">Phone: +8801611112222</p>
            </div>
          </div>
          <div className="PoppinsFont">
            <div className="flex gap-5 items-center mb-6">
              <img src={Mailicon} alt="" />
              <h2 className=" font-medium">Write To Us</h2>
            </div>
            <div className="space-y-4">
              <p className="">
                Fill out our form and we will contact <br /> you within 24
                hours.{" "}
              </p>
              <p className="">Emails: customer@exclusive.com</p>
              <p className="">Emails: support@exclusive.com</p>
            </div>
          </div>
        </div>
        <div className="lg:w-[60%] md:w-[100%] flex justify-center mt-10 md:mt-0">
          <form className=" w-full space-y-3 ">
            <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="px-4 py-2 rounded w-full"
                  style={{ background: "#F5F5F5" }}
                />
              </div>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-4 py-2 rounded w-full"
                  style={{ background: "#F5F5F5" }}
                />
              </div>
              <div className="w-full">
                <input
                  type="number"
                  placeholder="Your Phone"
                  className="px-4 py-2 rounded w-full"
                  style={{ background: "#F5F5F5" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3  mt-3">
              <div className="">
                <textarea
                  placeholder="Message"
                  className="px-4 py-2 rounded w-full"
                  style={{ background: "#F5F5F5" }}
                  rows={5}
                  cols={40}
                />
              </div>
            </div>
            <div className="float-right">
              <button
                className="text-white font-medium px-10 py-5 rounded w-full md:w-auto"
                style={{ background: "#DB4444" }}
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
