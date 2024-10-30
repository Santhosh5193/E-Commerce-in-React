import "./App.css";
import "./styles/style.scss";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/index/Home";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* <Route path="/home" element={<Navigate to="/home" />} /> */}
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
