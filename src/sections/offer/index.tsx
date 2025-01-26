import { Box, Stack, Typography } from "@mui/material";
import "./index.scss";
import video from "../../assets/images/New folder/videos/1080-142790249.mp4";
import { LocationOnOutlined } from "@mui/icons-material";
import Revail from "../../compenant/Revail";

export default function index() {
  return (
    <>
      <Box className="video-container" sx={{ mt: 20 }}>
        <video src={video} className="video" autoPlay loop muted playsInline />
        <Box className="overlay"></Box>
        <Box className="content">
          <Revail>
            <Typography variant="h3" component="h2" sx={{ fontWeight: 700 }}>
              Discover the world
            </Typography>
          </Revail>

          <Revail>
            {" "}
            <Stack
              direction={"row"}
              sx={{ mt: 1, alignItems: "center", justifyContent: "center" }}
            >
              <LocationOnOutlined />
              <Typography variant="body1" component="p" >
                Caribbean
              </Typography>
            </Stack>
          </Revail>
        </Box>
      </Box>
    </>
  );
}
