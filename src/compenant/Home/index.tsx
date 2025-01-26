import "./index.scss";
import Title from "../Title";
import { Box, Button, Typography } from "@mui/material";

export default function index() {
  return (
    <>
      <Box className="trip-content">
        <Box className="Content">
          <Title />
          <Typography variant="body1" component="p">
            Embark on a journey to the Caribbean, where turquoise waters meet
            pristine white-sand beaches. Relax under swaying palm trees, explore
            vibrant coral reefs, and savor the region's rich cultural heritage.
          </Typography>
          <Button
            sx={{ borderColor: "#fff", color: "#fff", mt: 4 }}
            variant="outlined"
            className="Home-btn"
          >
            Learn more
          </Button>
        </Box>
      </Box>
    </>
  );
}
