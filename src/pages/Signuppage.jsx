import Loginimg from "../assets/images/LoginImage.png";
import Googleicon from "../assets/icons/Googleicon.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, db, googleProvider } from "../../firebase";
import Swal from "sweetalert2";
import { setDoc, doc } from "firebase/firestore";
import ExclusiveContext from "../context/ExclusiveContext";
import moment from "moment";

const initialFormValues = {
  fname: "",
  email: "",
  mobileNumber: "",
  password: "",
};

function Signuppage() {
  const { setUserId } = useContext(ExclusiveContext);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    if (Object.keys(formErrors).length === 0) {
      submitToFireBase();
    } else {
      Swal.fire({
        icon: "error",
        title: "Please fix the errors before submitting",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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

      case "mobileNumber":
        if (value === "") {
          return "Enter your mobile number";
        } else if (value.length < 10) {
          return "Please enter valid mobile number";
        } else if (value.length >= 11) {
          return "Your mobile number is Must be 10 letters only";
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

  const submitToFireBase = async () => {
    const { fname, email, mobileNumber, password } = formValues;

    try {
      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: fname,
        email: email,
        mobileNumber: mobileNumber,
        loginTime: moment().format("DD-MM-YYYY HH:MM:SS"),
      });

      Swal.fire({
        icon: "success",
        title: "Account successfully created",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");

      // Reset form values after successful signup
      setFormValues(initialFormValues);
    } catch (error) {
      console.error("Error creating account:", error.message);
    }
  };

  // avoid e and and space character for mobile number
  const mobileValidation = (e) => {
    if (e.keyCode == 69 || e.keyCode == 189 || e.keyCode == 187) {
      e.preventDefault();
    }
  };
  const AvoidSpace = (event) => {
    if (event.charCode == 32 || event.keyCode == 32) {
      event.preventDefault();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        loginTime: moment().format("DD-MM-YYYY HH:MM:SS"),
      });
      setUserId(user.uid);
      Swal.fire({
        icon: "success",
        title: "Google login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed",
        text: error.message,
        showConfirmButton: true,
      });
      console.log(error.message);
    }
  };

  return (
    <div className="py-10 flex md:space-x-20 px-10 ">
      <div className="md:block hidden w-1/2">
        <img
          src={Loginimg}
          className="w-full h-[481px] object-cover"
          alt="login Image"
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
          onKeyDown={AvoidSpace}
        >
          <div className="pb-6">
            <input
              onChange={handlechange}
              type="text"
              name="fname"
              value={formValues.fname}
              placeholder="Name"
              className="border-b-2 sm:w-[50%] lg:w-[60%] outline-none"
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
              className="border-b-2 sm:w-[50%] lg:w-[60%] outline-none"
            />
            {errors.email && (
              <div className="emailMessage text-xs  text-red-500 font-medium">
                {errors.email}
              </div>
            )}
          </div>
          <div className="pb-6">
            <input
              onChange={handlechange}
              type="number"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formValues.mobileNumber}
              onKeyDown={mobileValidation}
              className="border-b-2 sm:w-[50%] lg:w-[60%] outline-none"
            />
            {errors.mobileNumber && (
              <div className="emailMessage text-xs  text-red-500 font-medium">
                {errors.mobileNumber}
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
              className="border-b-2 sm:w-[50%] lg:w-[60%] outline-none"
            />
            {errors.password && (
              <div className="emailMessage text-xs text-red-500 font-medium">
                {errors.password}
              </div>
            )}
          </div>

          <div
            className="rounded w-[100%] md:w-[50%] py-2 mt-5 text-center"
            style={{ background: "#DB4444", color: "white" }}
          >
            <button type="submit">Create Account</button>
          </div>
        </form>

        <div
          className="border-2 rounded  w-[100%] md:w-[50%] mt-8  p-2 flex justify-center items-center"
          onClick={handleGoogleLogin}
        >
          <button className="flex items-center md:gap-3 gap-2">
            <img src={Googleicon} alt="Googleicon" className="w-4" />
            <p className="sm:text-base text-sm ">Sign up with Google</p>
          </button>
        </div>
        <p
          className="mt-8 text-center w-[100%] md:w-[50%] text-nowrap"
          style={{ color: "#000000" }}
        >
          Already have account?
          <Link
            to="/login"
            style={{ color: "blue" }}
            className="font-medium pl-3 underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signuppage;
