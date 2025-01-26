import Carousel from "../../compenant/Carosel";
import Navbar from "../../compenant/Navbar";
import Destination from "../../sections/destination";
import Faqs from "../../sections/Faqs";
import Features from "../../sections/Features";
import DarkMap from "../../sections/Map";
import Offer from "../../sections/offer";
import Plans from "../../sections/Plans";
import Reviews from "../../sections/Reviews";

export default function index() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Features />
      <Destination />
      <Plans />
      <Offer />
      <DarkMap />
      <Reviews />
      <Faqs />
    </>
  );
}
