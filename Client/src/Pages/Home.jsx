import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import HeroPage from "../Components/HeroPage";
import BookFutsal from "../Components/BookFutsal";
import Footer from "../Components/Footer";
import About from "../Components/About";
import Contact from "../Components/Contact";
const Home = () => {
  return (
    <div className="bg-[#1a1a1a] w-screen h-[100%] text-[#ffffff]">
      <HeroPage />
      <BookFutsal />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
