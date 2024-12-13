import "./App.css";
import "./styles/style.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/index/Home";
import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Aboutpage from "./pages/Aboutpage";
import Contact from "./pages/Contact";
import CheckOut from "./pages/CheckOut";
import Notfoundpage from "./pages/Notfoundpage";
import Quantity from "./components/Quantity";
import ProductView from "./pages/ProductView";
// import Sample from "./pages/Sample";
import Imageupload from "./pages/Imageupload";
import Products from "./pages/Products";
import ScrollingTop from "./components/ScrollingTop";
import ManageAccount from "./pages/MyProfile/ManageAccount";
import Profileinfo from "./pages/MyProfile/Profileinfo";
import SeachList from "./components/SeachList";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Navbar />
      <ScrollingTop />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<CheckOut />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productview" element={<ProductView />} />
        <Route path="/products" element={<Products />} />
        <Route path="/myaccount" element={<ManageAccount />}>
          <Route path="profileInformation" element={<Profileinfo />} />
          <Route path="myOrders" element={<h2>my orders</h2>} />
        </Route>
        <Route path="/searchlist" element={<SeachList />} />
        <Route path="/*" element={<Notfoundpage />} />

        {/* for sample */}
        {/* <Route path="/about" element={<Quantity />} /> */}
        {/* <Route path="/login" element={<Sample />} /> */}
        {/* <Route path="/contact" element={<Imageupload />} /> */}
      </Routes>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
