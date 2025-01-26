import { useState, useRef, useEffect } from "react";
import "./index.scss"; // Import your CSS file for styling

import img1 from "../../assets/images/New folder/img1.webp";
import img2 from "../../assets/images/New folder/maldives1.jpg";
import { Box, Typography } from "@mui/material";

const Carousel = () => {
  const [data, setData] = useState([
    {
      img: img1,
      title: "Safari adventrue",
      description:
        "an exciting journey into nature, offering close encounters with wildlife in their natural habitats. Travelers explore stunning landscapes, observe animals like lions and elephants",
    },
    {
      img: img2,
      title: "Maldives adventures",
      description:
        "offer tropical escapes filled with pristine beaches, crystal-clear waters, and vibrant culture. Activities include snorkeling, diving among coral reefs, hiking lush rainforests.",
    },
  ]);
  const [autoNextTimeout, setAutoNextTimeout] = useState(null);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const timeRunning = 1000;
  const timeAutoNext = 7000;

  const showSlider = (type) => {
    const sliderItems = sliderRef.current.children;

    if (type === "next") {
      sliderRef.current.appendChild(sliderItems[0]);
      carouselRef.current.classList.add("next");
    } else {
      sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      // thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    setTimeout(() => {
      carouselRef.current.classList.remove("next");
      carouselRef.current.classList.remove("prev");
    }, timeRunning);
  };

  const handleNext = () => showSlider("next");
  const handlePrev = () => showSlider("prev");

  useEffect(() => {
    const autoNext = setInterval(() => handleNext(), timeAutoNext);
    setAutoNextTimeout(autoNext);

    return () => clearInterval(autoNext);
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={sliderRef}>
        {data.map((trip, index) => {
          return (
            <div className="item" key={index}>
              <img src={trip.img} alt={`Slide ${index + 1}`} />
              <div className="overlay"></div>
              <div className="content">
                <Box>
                  <Typography
                    className="title"
                    component={"h1"}
                    variant="h2"
                    sx={{ mb: { xs: 1, md: 0 } }}
                  >
                    {trip.title}
                  </Typography>
                </Box>
                <Typography className="des" variant="caption">
                  {trip.description}
                </Typography>
                <div className="buttons">
                  <button>SEE MORE</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
