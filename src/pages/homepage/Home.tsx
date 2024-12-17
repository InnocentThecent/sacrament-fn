import NavBar from "./Header";
import banner from "../../assets/banner.jpg";
import Footer from "../../layouts/Footer";
import Carousel from "../../components/Carousel";
const Homepage = () => {
  return (
    <div className="">
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-20 h-screen">
          <NavBar />
          <div className="flex justify-center items-center h-[80%]">
            <h3 className="font-bold text-5xl text-white">
              Parish Engagement and contribution tracking System
            </h3>
          </div>
        </div>
      </div>
      <Carousel />
      <Footer />
    </div>
  );
};

export default Homepage;
