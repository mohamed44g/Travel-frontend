import { Box } from "@mui/material";
import Slider from "react-slick";

export default function index({ sliderRef, asNavFor, Images }) {
  const settings = {
    fade: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider {...settings} asNavFor={asNavFor} ref={sliderRef}>
      {Images.map((img) => {
        return (
          <Box className="slider-img">
            <img src={img} alt="#" />
            <Box className="overlay"></Box>
          </Box>
        );
      })}
    </Slider>
  );
}
