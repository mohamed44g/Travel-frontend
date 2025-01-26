import { Box, Container } from "@mui/material";
import ImgCard from "../../compenant/ImgCard";
import Revail from "../../compenant/Revail";
import Slider from "react-slick";

import img1 from "../../assets/images/New folder/moscow.jpg";
import img2 from "../../assets/images/New folder/egypt.jpg";
import img3 from "../../assets/images/New folder/4.jpg";
import img4 from "../../assets/images/New folder/japan.jpg";
import Title from "../../compenant/Title";

export default function Index() {
  const data = [
    {
      img: img1,
      title: "Moscow",
    },

    {
      img: img2,
      title: "Egypt",
    },

    {
      img: img3,
      title: "Sweezland",
    },

    {
      img: img4,
      title: "Japan",
    },
  ];
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Title title="Discover popular destination" />
      <Container>
        <Box
          className="slider-container"
          sx={{ m: "auto", mt: 10, width: "93%" }}
        >
          <Slider {...settings}>
            {data.map((item, index) => (
              <Revail key={`${index} - destination`}>
                <ImgCard img={item.img} country={item.title} />
              </Revail>
            ))}
          </Slider>
        </Box>
      </Container>
    </>
  );
}
