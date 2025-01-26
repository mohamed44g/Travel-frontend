import { Box, Stack } from "@mui/material";
import "./index.scss";

export default function index() {
  return (
    <>
      <Stack
        sx={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
      >
        <Box className="loader"></Box>
      </Stack>
    </>
  );
}
