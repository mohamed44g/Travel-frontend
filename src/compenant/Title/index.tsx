import { Typography, Box } from "@mui/material";
import Revail from "../Revail";

function Title({ title }: { title: string }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 20,
      }}
    >
      <Revail>
        <Typography variant="h3" component={"h2"}>
          {title}
        </Typography>
      </Revail>
    </Box>
  );
}

export default Title;
