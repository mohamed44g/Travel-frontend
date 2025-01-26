import { Drawer, List, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../utils/isAuthenticated";
import { logout } from "../../utils/logout";

interface Drawer {
  (newOpen: boolean): (
    event: object,
    reason: "backdropClick" | "escapeKeyDown"
  ) => void;
}

export default function Index({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: Drawer;
}) {
  return (
    <>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List className="Navbar-links" sx={{ width: 250 }}>
          <Stack
            direction="column"
            spacing={5}
            sx={{
              justifyContent: "center",
              alignItems: "end",
              p: 2,
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
        </List>
      </Drawer>
    </>
  );
}
