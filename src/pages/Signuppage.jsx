import Loginimg from "../assets/images/LoginImage.png";
import Googleicon from "../assets/icons/Googleicon.svg";
import { Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import Swal from "sweetalert2";

const initialFormValues = {
  fname: "",
  email: "",
  password: "",
};

function Signuppage() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const emailValidation =
    /^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
  const upperCase = /[A-Z]/;
  const nameValidation = /^[A-Za-z0-9 ]+$/;

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
      case "fname":
        if (value === "") {
          return "Enter your name";
        } else if (!nameValidation.test(value)) {
          return "Number doesn't accept special charcters";
        } else if (value.length < 5) {
          return "It must have mininum 5 characters";
        } else if (value.length >= 5) {
          return null;
        }

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

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Swal.fire({
          icon: "success",
          title: "Successfully Created",
          showConfirmButton: false,
          timer: 1500,
        });
        setFormValues(initialFormValues);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
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
        <h2 className="InterFont md:text-4xl text-2xl font-medium tracking-wider">
          Create an account
        </h2>
        <p className="PoppinsFont text-base font-normal mt-2">
          Enter your details below
        </p>
        <form
          className="flex flex-col PoppinsFont mt-[7%]"
          onSubmit={handleFormSubmit}
        >
          <div className="pb-6">
            <input
              onChange={handlechange}
              type="text"
              name="fname"
              value={formValues.fname}
              placeholder="Name"
              className="border-b-2 sm:w-[50%] outline-none"
            />
            {errors.fname && (
              <div className="emailMessage text-xs  text-red-500 font-medium">
                {errors.fname}
              </div>
            )}
          </div>
          <div className="pb-6">
            <input
              onChange={handlechange}
              type="email"
              name="email"
              value={formValues.email}
              placeholder="Email"
              className="border-b-2 sm:w-[50%] outline-none"
            />
            {errors.email && (
              <div className="emailMessage text-xs pb-3 text-red-500 font-medium">
                {errors.email}
              </div>
            )}
          </div>
          <div className="pb-3">
            <input
              onChange={handlechange}
              type="text"
              name="password"
              placeholder="Password"
              value={formValues.password}
              className="border-b-2 sm:w-[50%] outline-none"
            />
            {errors.password && (
              <div className="emailMessage text-xs text-red-500 font-medium">
                {errors.password}
              </div>
            )}
          </div>

          <div
            className="rounded w-[50%] py-2 mt-5 text-center"
            style={{ background: "#DB4444", color: "white" }}
          >
            <button type="submit">Create Account</button>
          </div>

          <div className="border-2 rounded w-[50%] mt-8  p-2 flex justify-center items-center">
            <button className="flex items-center md:gap-3 gap-2">
              <img src={Googleicon} alt="Googleicon" className="w-4" />
              <p className="sm:text-base text-sm ">Sign up with Google</p>
            </button>
          </div>
          <p className="mt-8 text-center w-[50%]" style={{ color: "#000000" }}>
            Already have account?
            <Link
              to="/login"
              style={{ color: "blue" }}
              className="font-medium pl-3 underline underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signuppage;
