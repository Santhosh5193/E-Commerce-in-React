import { Link } from "react-router-dom";

function Notfoundpage() {
  return (
    <section className="py-10 px-16 ">
      <div className="">
        <header>
          <h2 className="PoppinsFont mb-10">
            Home / <span className="font-medium">404 Error </span>
          </h2>
        </header>
        <main className=" flex flex-col justify-center items-center">
          <h1 className="InterFont font-medium lg:text-[110px]  md:text-[90px] sm:text-[70px] ssm:text-[50px] text-[35px] mb-5">
            404 Not Found
          </h1>
          <p className="PoppinsFont md:text-base text-sm">
            Your visited page not found. You may go home page.
          </p>
          <div
            className="rounded w-[70%] sm:w-[30%] lg:w-[20%] md:w-[25%] mx-auto py-2 mt-10 mb-16 text-center "
            style={{ background: "#DB4444", color: "white" }}
          >
            <button type="submit">
              <Link to="/">Back to home page</Link>
            </button>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Notfoundpage;
