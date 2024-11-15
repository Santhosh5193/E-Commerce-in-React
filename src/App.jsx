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

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<CheckOut />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/about" element={<Quantity />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productview" element={<ProductView />} />
        <Route path="/*" element={<Notfoundpage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
