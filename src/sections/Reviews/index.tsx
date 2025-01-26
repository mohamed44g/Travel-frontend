import Box from "@mui/material/Box";
import ReviewCard from "../../compenant/reviewCard";
import Title from "../../compenant/Title";
import Slider from "react-slick";
import Revail from "../../compenant/Revail";
import { Container } from "@mui/material";

const reviews = [
  {
    name: "Sarah Johnson",
    date: "January 5, 2025",
    rating: 5.0,
    comment:
      "Absolutely loved the experience! Everything was smooth and exceeded my expectations. Highly recommended!",
  },
  {
    name: "Michael Brown",
    date: "December 30, 2024",
    rating: 3.5,
    comment:
      "The trip was good, but there were a few hiccups in communication. The destination was fantastic, though!",
  },
  {
    name: "Emily Davis",
    date: "January 2, 2025",
    rating: 2.0,
    comment:
      "Unfortunately, the service was not up to the mark. The itinerary was not followed properly, and there were delays.",
  },
  {
    name: "Alex Thompson",
    date: "January 3, 2025",
    rating: 5.0,
    comment:
      "Best experience ever! The team was professional, and the activities were well-organized. I can't wait to book another trip!",
  },
  {
    name: "Rachel Miller",
    date: "January 4, 2025",
    rating: 3.0,
    comment:
      "It was an average experience. Some parts of the trip were good, but others felt a bit rushed.",
  },
  {
    name: "David Wilson",
    date: "December 28, 2024",
    rating: 4.8,
    comment:
      "The entire process was seamless, and the destinations were breathtaking. Highly recommend for adventure lovers!",
  },
  {
    name: "Sophia Martinez",
    date: "December 31, 2024",
    rating: 1.5,
    comment:
      "Very disappointed. The team was not prepared, and the accommodations were below expectations. Not worth the price.",
  },
  {
    name: "James Anderson",
    date: "January 5, 2025",
    rating: 5.0,
    comment:
      "An unforgettable experience! From start to finish, everything was perfect. Exceptional service and great attention to detail.",
  },
];

export default function Index() {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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
      <Box sx={{ mt: 20 }}>
        <Title title="What they say?" />
        <Container sx={{ mt: 10 , width: '93%'}}>
          <Slider {...settings}>
            {reviews.map((review) => {
              return (
                <Revail key={review.name}>
                  <ReviewCard
                    key={review.name}
                    name={review.name}
                    date={review.date}
                    rate={review.rating}
                    comment={review.comment}
                  />
                </Revail>
              );
            })}
          </Slider>
        </Container>
      </Box>
    </>
  );
}
