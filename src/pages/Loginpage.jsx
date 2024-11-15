import Loginimg from "../assets/images/LoginImage.png";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import Swal from "sweetalert2";

const initialFormValues = {
  email: "",
  password: "",
};

function Loginpage() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const emailValidation =
    /^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
  const upperCase = /[A-Z]/;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};

    Object.keys(formValues).forEach((name) => {
      const value = formValues[name];
      const fieldError = validateField(name, value);
      if (fieldError) {
        formErrors[name] = fieldError;
      }
    });
    setErrors(formErrors);
    submitToFireBase();
    // if (Object.keys(formErrors).length === 0) {
    //   console.log("Form Submitted:", formValues);
    //   setFormValues(initialFormValues);
    // }
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);

    setFormValues((pre) => ({
      ...pre,
      [name]: value,
    }));

    if (fieldError) {
      setErrors((pre) => ({
        ...pre,
        [name]: fieldError,
      }));
    } else {
      setErrors((pre) => {
        const { [name]: removedNameError, ...remainingErrors } = pre;
        return remainingErrors;
      });
    }
  };

  function validateField(name, value) {
    switch (name) {
      case "email":
        if (value === "") {
          return "Enter your email";
        } else if (upperCase.test(value)) {
          return "Uppercase isn't allowed";
        } else if (!emailValidation.test(value)) {
          return "Enter the corect email";
        } else {
          return null;
        }

      case "password":
        const number = /[0-9]/;
        const specialCharacters = /^(?=.*?[#?!@$%^&*-])/;

        if (value === "") {
          return "Enter your password";
        } else if (!upperCase.test(value)) {
          return "Your password needs at least one upper case letter";
        } else if (!number.test(value)) {
          return "Password needs atleast one number";
        } else if (!specialCharacters.test(value)) {
          return "Password needs atleast special characters";
        } else if (value.length < 8) {
          return "Password must have 8 characters";
        } else if (value.length > 16) {
          return "Password must have below 16 characters";
        } else {
          return null;
        }

      default:
        return null;
    }
  }

  const submitToFireBase = () => {
    const { email, password } = formValues;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          icon: "success",
          title: "Successfully Login",
          showConfirmButton: false,
          timer: 1500,
        });
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // Swal.fire({
        //   icon: "error",
        //   title: "Oops...",
        //   text: "Something went wrong!",
        // });
      });
  };

  return (
    <div className="py-10 flex space-x-20 ">
      <div className="md:block hidden w-1/2">
        <img
          src={Loginimg}
          className="w-full h-[481px] object-cover"
          alt="logn Image"
        />
      </div>
      <div className="md:w-1/2 w-full  md:items-start">
        <h2 className="InterFont md:text-4xl text-2xl font-medium tracking-wide">
          Log in to Exclusive
        </h2>
        <p className="PoppinsFont text-base font-normal mt-2 ">
          Enter your details below
        </p>
        <form
          className="flex flex-col PoppinsFont mt-[7%]"
          onSubmit={handleFormSubmit}
        >
          <input
            onChange={handlechange}
            type="email"
            name="email"
            value={formValues.email}
            placeholder="Email"
            className="border-b-2 w-[50%] outline-none"
          />
          {errors.email && (
            <div className="emailMessage text-xs text-red-500 font-medium">
              {errors.email}
            </div>
          )}
          <input
            onChange={handlechange}
            type="text"
            name="password"
            placeholder="Password"
            value={formValues.password}
            className="border-b-2 w-[50%] mt-5 outline-none"
          />
          {errors.password && (
            <div className="emailMessage text-xs text-red-500 font-medium">
              {errors.password}
            </div>
          )}

          <div className="flex w-full mt-5 items-center space-x-10">
            <div
              className="rounded text-nowrap flex items-center justify-center px-10 py-1 w-[10%]"
              style={{ background: "#DB4444", color: "white" }}
            >
              <button type="submit">Log in </button>
            </div>
            <div className="text-sm sm:text-base">
              <p className="" style={{ color: "#DB4444" }}>
                Forgot Password?
              </p>
            </div>
          </div>

          <p className="mt-8 " style={{ color: "#000000" }}>
            Don't you have an account?
            <Link
              to="/signup"
              className="font-medium pl-3 underline underline-offset-4 "
              style={{ color: "blue" }}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Loginpage;
