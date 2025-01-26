import { Box, Container, IconButton, Stack } from "@mui/material";
import "./index.scss";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Drawer from "../drawer";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { logout } from "../../utils/logout";

export default function Index() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <Box className="Navbar">
      <Stack
        direction="row"
        spacing={15}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Link to={"/"}>Home</Link>
        <Link to="/destination">Trips</Link>
        <Link to={"/contact"}>Contact us</Link>
        {isAuthenticated() && <Link to={"profile"}>Profile</Link>}
        {isAuthenticated() == true ? (
          <Link to="#" onClick={logout}>
            Logout
          </Link>
        ) : (
          <Link to={"/signin"}>Sign in</Link>
        )}
      </Stack>

      <Container sx={{ display: { xs: "block", sm: "none" } }}>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <Drawer open={open} toggleDrawer={toggleDrawer} />
      </Container>
    </Box>
  );
}
