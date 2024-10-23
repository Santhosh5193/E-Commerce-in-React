import "./App.css";
import "./styles/style.scss";
import Home from "./pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Navb from "./components/Navb";

function App() {
  return (
    <div>
      <Navbar />
      {/* <Navb /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
