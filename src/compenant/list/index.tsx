import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import PlaceIcon from "@mui/icons-material/Place";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Revail from "../Revail";

const FeaturesList = () => {
  const features = [
    {
      icon: <PublicIcon sx={{ color: "#1fd755" }} />,
      text: "Explore destinations worldwide.",
    },
    {
      icon: <PlaceIcon sx={{ color: "#1fd755" }} />,
      text: "Click on pins to see details about places",
    },
    {
      icon: <MyLocationIcon sx={{ color: "#1fd755" }} />,
      text: "Use geolocation to find nearby attractions.",
    },
  ];

  return (
    <Box
      sx={{
        borderRadius: "8px",
        mt: 1,
        ml: -2.2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <List>
        {features.map((feature, index) => (
          <Revail key={`${index} - feature`}>
            <ListItem key={`${index} - feature`}>
              <ListItemIcon>{feature.icon}</ListItemIcon>
              <ListItemText secondary={feature.text} />
            </ListItem>
          </Revail>
        ))}
      </List>
    </Box>
  );
};

export default FeaturesList;
