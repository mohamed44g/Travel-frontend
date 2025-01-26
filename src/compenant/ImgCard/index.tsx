import { Box, Stack, Typography } from "@mui/material";
import "./index.scss";
import { LocationOnOutlined } from "@mui/icons-material";
import Rating from "../Rating";

export default function index({
  img,
  country,
}: {
  img: string;
  country: string;
}) {
  return (
    <Box className="ImgCard">
      <img src={img} alt="Image" />
      <div className="overlay"></div>
      <div className="content">
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            ml: -1,
          }}
        >
          <LocationOnOutlined />
          <Typography className="title" variant={"h6"} component={"h4"}>
            {country}
          </Typography>
        </Stack>
        <Rating value={5} onchange={() => {}} />
      </div>
    </Box>
  );
}
