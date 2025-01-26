import { Box, Container, Grid2, Typography } from "@mui/material";
import "./index.scss";
import {
  BookmarkBorderOutlined,
  CalendarMonthOutlined,
  ExploreOutlined,
  LockOutlined,
} from "@mui/icons-material";
import Revail from "../../compenant/Revail";


export default function Index() {
  const FeaturesCards = [
    {
      id: 1,
      icon: ExploreOutlined,
      title: "Explore Destinations",
      description:
        "Discover curated guides to the world's most beautiful destinations.",
    },

    {
      id: 2,
      icon: CalendarMonthOutlined,
      title: "Flexible Schedules",
      description:
        "Choose from a variety of dates and times to suit your plans.",
    },

    {
      id: 3,
      icon: LockOutlined,
      title: "Secure Payments",
      description: "Enjoy peace of mind with safe and secure payment methods.",
    },

    {
      id: 4,
      icon: BookmarkBorderOutlined,
      title: "Free Booking",
      description:
        "Easily book flights, accommodations, and tours in just a few clicks.",
    },
  ];
  return (
    <Box className="features">
      {/* <Title hint="Our Features" title="Discover our servises now" /> */}
      <Container sx={{ height: "inherit" }}>
        <Grid2
          sx={{ height: "inherit", alignItems: "center" }}
          container
          spacing={3}
        >
          {FeaturesCards.map((card) => (
            <Grid2
              key={card.id}
              className="feature-card"
              textAlign={"center"}
              size={{ xs: 12, sm: 6, md: 6, lg: 3 }}
            >
              <Box
                component={card.icon}
                sx={{ fontSize: 48, color: "#1fd755" }}
              />
              <Box>
                <Revail>
                  <Typography
                    variant="h6"
                    className="feature-card-title"
                    sx={{ mt: 1 }}
                  >
                    {card.title}
                  </Typography>
                </Revail>
              </Box>

              <Revail>
                <Typography
                  variant="body1"
                  className="feature-card-description"
                  sx={{ mt: 1 }}
                >
                  {card.description}
                </Typography>
              </Revail>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}
