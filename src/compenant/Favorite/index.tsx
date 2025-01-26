import { useState } from "react";
import "./style.scss";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function Index() {
  const [Isclicked, setIsclicked] = useState(false);

  const handelClick = () => {
    setIsclicked(!Isclicked);
  };
  return (
    <>
      {Isclicked == true ? (
        <IconButton onClick={handelClick}>
          <Favorite sx={{ color: "#333" }} />
        </IconButton>
      ) : (
        <IconButton onClick={handelClick}>
          <FavoriteBorder sx={{ color: "#333" }} />
        </IconButton>
      )}
    </>
  );
}
