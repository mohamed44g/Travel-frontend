import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import {
  AddReactionOutlined,
  CalendarTodayOutlined,
  CameraAltOutlined,
  FeedOutlined,
  HowToRegOutlined,
} from "@mui/icons-material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ children }) {
  const [value, setValue] = React.useState(0);
  const taps = [
    {
      name: "information",
      icon: <FeedOutlined />,
    },
    {
      name: "tour plan",
      icon: <CalendarTodayOutlined />,
    },

    {
      name: "reviews",
      icon: <AddReactionOutlined />,
    },

    {
      name: "regester",
      icon: <HowToRegOutlined />,
    },
  ];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            color: "#1fd755",
            "& .MuiTabs-indicator": {
              color: "#1fd755",
              backgroundColor: "transparent",
            },
          }}
          aria-label="basic tabs example"
        >
          {taps.map((tap, index) => (
            <Tab
              key={index}
              label={tap.name}
              icon={tap.icon}
              iconPosition="start"
              {...a11yProps(index)}
              sx={{
                "&.Mui-selected": {
                  color: "#1fd755",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>
      {children.map((child, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          {child}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
