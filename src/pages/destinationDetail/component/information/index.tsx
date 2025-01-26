import { PersonOutlineOutlined, ClassOutlined } from "@mui/icons-material";
import { Typography, Rating, Stack, Button } from "@mui/material";
import { convertDate } from "../../../../utils/convertTohumandate";
import { ReactNode } from "react";

interface Destination {
  name: string;
  price: number;
  rating: number;
  description: string;
  category: string;
  country: string;
  location: string;
  date: string;
  time: string;
}

export default function index({ destenation }: { destenation: Destination }) {
  const ListContainer = ({ children }: { children: ReactNode }) => {
    return (
      <>
        <Stack
          direction={"row"}
          sx={{
            width: { xs: "100%", md: "30%" },
            m: { xs: 1, md: 2 },
            mt: { xs: 5, md: 5 },
            justifyContent: "space-between",
          }}
        >
          {children}
        </Stack>
      </>
    );
  };
  return (
    <>
      <Typography variant="h5" sx={{ m: { xs: 1, md: 2 } }}>
        {destenation.name}
      </Typography>

      <Typography variant="body1" sx={{ m: { xs: 1, md: 2 } }}>
        {destenation.price} $ / person
      </Typography>

      <Rating
        name="half-rating-read"
        sx={{
          fontSize: 18,
          m: { xs: 1, md: 2 },
          color: "#1fd755",
        }}
        defaultValue={destenation.rating}
        readOnly
      />

      <Typography variant="body1" sx={{ m: { xs: 1, md: 2 } }}>
        {destenation.description}
      </Typography>

      <Stack
        direction={"row"}
        sx={{ m: { xs: 1, md: 2 }, mt: { xs: 5, md: 5 } }}
        spacing={2}
      >
        <Button
          sx={{
            backgroundColor: "#1fd755",
            color: "#fff",
          }}
        >
          <PersonOutlineOutlined sx={{ mr: 1, mt: -0.3 }} />
          Age 18
        </Button>

        <Button
          sx={{
            backgroundColor: "#1fd755",
            color: "#fff",
          }}
        >
          <ClassOutlined sx={{ mr: 1, mt: -0.3 }} />
          {destenation.category}
        </Button>
      </Stack>

      <ListContainer>
        <Typography>Country</Typography>
        <Typography
          sx={{
            color: "text.secondary",
            textAlign: "start",
          }}
        >
          {destenation.country}
        </Typography>
      </ListContainer>

      <ListContainer>
        <Typography>location</Typography>
        <Typography
          sx={{
            color: "text.secondary",
            textAlign: "start",
          }}
        >
          {destenation.location}
        </Typography>
      </ListContainer>

      <ListContainer>
        <Typography>date</Typography>
        <Typography
          sx={{
            color: "text.secondary",
            textAlign: "end",
          }}
        >
          {convertDate(destenation.date)}
        </Typography>
      </ListContainer>

      <ListContainer>
        <Typography>time</Typography>
        <Typography
          sx={{
            color: "text.secondary",
            textAlign: "end",
          }}
        >
          {destenation.time}
        </Typography>
      </ListContainer>
    </>
  );
}
