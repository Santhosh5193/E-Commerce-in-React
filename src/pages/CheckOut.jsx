import Gamemouse from "../assets/SellingProducts/images/Gamemouse.png";
import { useContext, useEffect } from "react";
import ExclusiveContext from "../context/ExclusiveContext";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const initialFormValues = {
  fname: "",
  email: "",
  mobileNumber: "",
  CompanyName: "",
  Dnum: "",
  Statepin: "",
  City: "",
};

function CheckOut() {
  const { userId, cartlistProducts, subTotalPrice, shippingCost, totalPrice } =
    useContext(ExclusiveContext);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isRadioChecked, setIsRadioChecked] = useState(false);
  const navigate = useNavigate();
  const [isNewAddress, setIsNewAddress] = useState(false);
  const [isCheckboxTouched, setIsCheckboxTouched] = useState(false);
  const [isRadioboxTouched, setisRadioboxTouched] = useState(false);

  // Rejex
  const emailValidation =
    /^[a-z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
  const upperCase = /[A-Z]/;
  const nameValidation = /^[A-Za-z0-9 ]+$/;
  const formErrors = {};

  // Submitted Form
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    Object.keys(formValues).forEach((name) => {
      const value = formValues[name];
      const fieldError = validateField(name, value);
      if (fieldError) {
        formErrors[name] = fieldError;
      }
    });

    if (!isChecked) {
      formErrors.checkbox = "You must agree that details are true.";
      setIsCheckboxTouched(true);
    }
    if (!isRadioChecked) {
      formErrors.radiobox = "You must choose anyone .";
      setisRadioboxTouched(true);
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await submitToFireBase();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Submission failed",
          text: error.message,
          showConfirmButton: true,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Please fill the form before submitting",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // Validate Section
  const validateField = (name, value) => {
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

      case "Dnum":
        if (value === "") {
          return "Enter Door num or street name";
        }
      case "City":
        if (value === "") {
          return "Enter village or city name";
        }
      case "Statepin":
        if (value === "") {
          return "Enter state name and pincode";
        }

      default:
        return null;
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

  const mobileValidation = (e) => {
    const invalidKeys = ["e", "+", "-"];
    if (invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const getuserData = async () => {
      if (!userId) {
        console.log("No user ID provided.");
        return; // If no userId is available, exit early
      } else {
        console.log("provided");
      }
      try {
        const userRef = doc(db, "users", userId);
        const getData = await getDoc(userRef);
        const userData = getData.data() || [];
        setUserData(userData);
      } catch (error) {
        console.error("Error creating account:", error.message);
      }
    };
    getuserData();
  }, [userId]);

  // submitting Form Values to Firebase
  const submitToFireBase = async () => {
    const { fname, email, mobileNumber, CompanyName, Dnum, City, Statepin } =
      formValues;

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User not authenticated",
        text: "Please log in to continue",
        showConfirmButton: true,
      });
      return;
    }

    const OrderTime = new Date();
    // console.log(userId);

    try {
      const userRef = doc(db, "users", userId);

      // Fetch existing user data
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data().users || [];
      } else {
        await setDoc(userRef, {
          users: [{}],
        });
      }

      // Get current addresses or initialize as an empty array
      const currentAddresses = userData?.address || [];
      const currentCartDetails = userData?.cartDetails || [];

      const updateAddress = [
        ...currentAddresses,
        {
          Id: uuidv4(),
          fname,
          email,
          mobileNumber,
          CompanyName,
          doornumber: Dnum,
          City,
          Statepincode: Statepin,
        },
      ];
      const updatedCurrentCartDetails = [
        ...currentCartDetails,
        {
          Id: uuidv4(),
          cartlistProducts,
          subTotalPrice,
          shippingCost,
          totalPrice,
          OrderTime: moment().format("DD-MM-YYYY HH:MM:SS"),
        },
      ];

      await updateDoc(userRef, {
        address: updateAddress,
        cartDetails: updatedCurrentCartDetails,
      });

      Swal.fire({
        icon: "success",
        title: "Order placed successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      await deleteProductsUpdate();
      navigate("/");
      setFormValues(initialFormValues);
    } catch (error) {
      console.error("Error creating account:", error.message);
    }
  };

  const handleAddForm = () => {
    setIsNewAddress(true);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
    setIsCheckboxTouched(true);
  };
  const handleRadioboxChange = (e) => {
    setIsRadioChecked(e.target.checked);
    setisRadioboxTouched(true);
  };

  const handleDeleteAddress = async (id) => {
    try {
      const userRef = doc(db, "users", userId);

      const updatedAddress = userData.address.filter(
        (addressItem) => addressItem.Id !== id
      );
      await updateDoc(userRef, { address: updatedAddress });
      // console.log("userData", userData);
      console.log("updated-address : ", updatedAddress);
      const getData = await getDoc(userRef);
      const usersData = getData.data();
      setUserData(usersData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [isPastAddress, setPastAddress] = useState();

  const handleChooseAddress = async (id) => {
    console.log("Choosed");
    try {
      const updatedAddress = userData.address.filter(
        (addressItem) => addressItem.Id === id
      );
      console.log(updatedAddress);
      setPastAddress(updatedAddress[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [checkRadio, setischeckRadio] = useState(false);
  const handleAddAddress = async () => {
    if (!isPastAddress) {
      Swal.fire({
        icon: "error",
        title: "No address selected",
        text: "Please choose an address before proceeding.",
        showConfirmButton: true,
      });
      return;
    }

    if (!isRadioChecked) {
      setischeckRadio(true);
      // return;
    }

    const { Id } = isPastAddress || {};

    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "User not authenticated",
        text: "Please log in to continue",
        showConfirmButton: true,
      });
      return;
    }

    try {
      const userRef = doc(db, "users", userId);

      // Fetch existing user data
      const userSnapshot = await getDoc(userRef);
      const userData = userSnapshot.data();

      // Get current addresses or initialize as an empty array
      const currentCartDetails = userData?.cartDetails || [];

      const updatedCurrentCartDetails = [
        ...currentCartDetails,
        {
          Id: uuidv4(),
          AddressId: Id,
          cartlistProducts,
          subTotalPrice,
          shippingCost,
          totalPrice,
          OrderTime: moment().format("DD-MM-YYYY HH:MM:SS"),
        },
      ];

      await updateDoc(userRef, {
        cartDetails: updatedCurrentCartDetails,
      });

      Swal.fire({
        icon: "success",
        title: "Order placed successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      await deleteProductsUpdate();

      navigate("/");
      setPastAddress(null);
    } catch (error) {
      console.error("Error creating account:", error.message);
    }
  };

  const deleteProductsUpdate = async () => {
    const cartref = doc(db, "Cartlist", userId);
    const cartItems = await getDoc(cartref);
    const cartData = cartItems.data();

    const cartProducts = cartData?.products || [];
    const updatedCartProducts = cartProducts.filter(
      (product) =>
        !cartlistProducts.some((cartItem) => cartItem.id === product.id)
    );

    await updateDoc(cartref, { products: updatedCartProducts });
  };

  return (
    <section className="py-10 md:px-16 sm:px-10 px-5">
      <div className="">
        <header>
          <h2 className="PoppinsFont mb-10">
            <Link to="/"> Home</Link> / <Link to="/cart"> cart </Link> /
            <span className="font-medium">Checkout</span>
          </h2>
        </header>
        <main className="md:flex space-y-16 gap-10">
          <div className="md:w-1/2 w-full h-full">
            <h2 className="InterFont font-medium sm:text-3xl text-xl mb-8">
              Billing Details
            </h2>
            {!isNewAddress && userData?.address?.length > 0 ? (
              <div className="border-2 h-[70vh] w-full overflow-auto">
                <div className="flex justify-between items-center px-4">
                  <div className="">
                    {userData?.address.length > 1
                      ? "Choose Address"
                      : " Default Address"}
                  </div>
                  <div className="border-2 p-1 bg-gray-300">
                    <button className="" onClick={handleAddForm}>
                      +Add New Address
                    </button>
                  </div>
                </div>

                <div className="">
                  {userData.address?.map((address, index) => (
                    <div className="border-2 m-4 p-5 relative" key={index}>
                      <h2 className="">Address:</h2>
                      <div className="pl-5 flex flex-col flex-nowrap">
                        <p>{address.doornumber}</p>
                        <p>{address.City}</p>
                        <p>{address.Statepincode}</p>
                      </div>
                      <div className="absolute right-0 bottom-0 flex gap-2">
                        <button
                          className="px-2 bg-blue-300 border-2"
                          onClick={() => handleChooseAddress(address.Id)}
                        >
                          Choose this Address
                        </button>
                        <button
                          className="px-2 bg-red-400 border-2"
                          onClick={() => handleDeleteAddress(address.Id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <form
                className="flex flex-col space-y-2"
                onSubmit={handleFormSubmit}
                id="checkoutForm"
              >
                <label
                  htmlFor="fname"
                  className=""
                  style={{ color: "#9b9b9b" }}
                >
                  First Name <span className="text-red-600">*</span>
                </label>
                <div className="">
                  <input
                    id="fname"
                    onChange={handlechange}
                    type="text"
                    name="fname"
                    value={formValues.fname}
                    placeholder="Name"
                    style={{ background: "#f5f5f5" }}
                    className="md:w-[80%] w-full p-2 rounded outline-none"
                  />
                  {errors.fname && (
                    <div className="emailMessage text-xs  text-red-500 font-medium">
                      {errors.fname}
                    </div>
                  )}
                </div>
                <label
                  htmlFor="Cname"
                  className=""
                  style={{ color: "#9b9b9b" }}
                >
                  Company Name
                </label>
                <div className="">
                  <input
                    id="Cname"
                    onChange={handlechange}
                    type="text"
                    value={formValues.CompanyName}
                    name="CompanyName"
                    style={{ background: "#f5f5f5" }}
                    className="md:w-[80%] w-full p-2 rounded outline-none"
                  />
                </div>

                <label
                  htmlFor="Address"
                  className=""
                  style={{ color: "#9b9b9b" }}
                >
                  Door Number, street Name
                  <span className="text-red-600">*</span>
                </label>
                <div className="pb-4">
                  <input
                    type="text"
                    onChange={handlechange}
                    value={formValues.Dnum}
                    name="Dnum"
                    placeholder="Door No / Street Name"
                    id="Address"
                    style={{ background: "#f5f5f5" }}
                    className="md:w-[80%] w-full p-2 rounded outline-none"
                  />
                  {errors.Dnum && (
                    <div className="emailMessage text-xs  text-red-500 font-medium">
                      {errors.Dnum}
                    </div>
                  )}
                </div>
                <label
                  htmlFor="Address2"
                  className=""
                  style={{ color: "#9b9b9b" }}
                >
                  Village / City ,ect.(optional)
                  <span className="text-red-600">*</span>
                </label>
                <div className="pb-4">
                  <input
                    onChange={handlechange}
                    value={formValues.City}
                    name="City"
                    type="text"
                    id="Address2"
                    style={{ background: "#f5f5f5" }}
                    className="md:w-[80%] w-full p-2 rounded outline-none"
                  />
                  {errors.City && (
                    <div className="emailMessage text-xs  text-red-500 font-medium">
                      {errors.City}
                    </div>
                  )}
                </div>

                <label
                  htmlFor="Address3"
                  className=""
                  style={{ color: "#9b9b9b" }}
                >
                  State & Pincode <span className="text-red-600">*</span>
                </label>
                <div className="">
                  <input
                    onChange={handlechange}
                    value={formValues.Statepin}
                    name="Statepin"
                    type="text"
                    id="Address3"
                    style={{ background: "#f5f5f5" }}
                    className="md:w-[80%] w-full p-2 rounded outline-none"
                  />
                  {errors.Statepin && (
                    <div className="emailMessage text-xs  text-red-500 font-medium">
                      {errors.Statepin}
                    </div>
                  )}
                </div>

                <label
                  htmlFor="Number"
                  className=""
                  style={{ color: "#9b9b9b" }}
                >
                  Phone Number
                  <span className="text-red-600">*</span>
                </label>
                <div className="">
                  <input
                    id="Number"
                    onChange={handlechange}
                    type="number"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formValues.mobileNumber}
                    onKeyDown={mobileValidation}
                    style={{ background: "#f5f5f5" }}
                    className="md:w-[80%] w-full p-2 rounded outline-none"
                  />
                  {errors.mobileNumber && (
                    <div className="emailMessage text-xs  text-red-500 font-medium">
                      {errors.mobileNumber}
                    </div>
                  )}
                </div>

                <label
                  htmlFor="email"
                  className=""
                  style={{ color: "#9b9b9b" }}
                >
                  Email Address
                  <span className="text-red-600">*</span>
                </label>
                <div className="">
                  <input
                    id="email"
                    onChange={handlechange}
                    type="email"
                    name="email"
                    value={formValues.email}
                    placeholder="Email"
                    style={{ background: "#f5f5f5" }}
                    className="md:w-[80%] border-2 w-full p-2 rounded outline-none"
                  />
                  {errors.email && (
                    <div className="emailMessage text-xs  text-red-500 font-medium">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="flex gap-5">
                  <input
                    type="checkbox"
                    id="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label>Details are True</label>
                </div>
                {isCheckboxTouched && !isChecked && (
                  <div className="text-xs text-red-500 font-medium">
                    {errors.checkbox}
                  </div>
                )}
              </form>
            )}
          </div>
          <div className="md:w-1/2 w-full h-full PoppinsFont">
            {cartlistProducts.map((item) => (
              <div className="mt-10" key={item.id}>
                <div className="flex justify-between items-center ">
                  <div className="flex items-center space-x-7 ">
                    <img
                      src={item.image[0]}
                      alt="LCD Monitor"
                      className="w-10"
                    />
                    <p className="inline-block truncate sm:w-[270px] md:w-[150px] ssm:w-[240px] w-[130px] lg:w-full">
                      {item.productName}
                    </p>
                  </div>
                  <div className="">
                    <p className="">
                      {(item.quantity * item.offerPrice).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-10 border-b-2 pb-3">
              <p className="">Subtotal: </p>
              <p className="">{subTotalPrice}</p>
            </div>
            <div className="flex justify-between border-b-2 py-3">
              <p className="">Shipping: </p>
              <p className="">{shippingCost}</p>
            </div>
            <div className="flex justify-between py-4">
              <p className="">Total: </p>
              <p className="">{totalPrice}</p>
            </div>
            <div className="mt-3">
              <div className="flex space-x-5">
                <input
                  type="checkbox"
                  id="radiobtn"
                  checked={isRadioChecked || checkRadio}
                  className="w-4"
                  onChange={handleRadioboxChange}
                />
                <label htmlFor="radiobtn">Cash on delivery</label>
              </div>
              {isRadioboxTouched && !isRadioChecked && (
                <div className="text-xs text-red-500 font-medium">
                  {errors.radiobox}
                </div>
              )}
            </div>
            <div className=" flex justify-center mt-10">
              {isNewAddress ||
              !userData?.address ||
              userData?.address?.length === 0 ? (
                <button
                  type="submit"
                  form="checkoutForm"
                  className=" PoppinsFont bg-secondary py-2 rounded-md  w-[150px] text-white"
                >
                  Place order
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handleAddAddress}
                  className=" PoppinsFont bg-secondary py-2 rounded-md  w-[150px] text-white"
                >
                  Place order
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}

export default CheckOut;
