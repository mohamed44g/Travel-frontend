import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import * as motion from "motion/react-client";

const AutoCounter = () => {
  const [count, setCount] = useState(0);

  // Automatically increment the counter every 1 second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 200) {
          clearInterval(intervalId);
          return 200;
        }
        return prevCount + 1;
      });
    }, 50);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Animated Counter */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Typography
          variant="h3"
          sx={{
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {count}
          </motion.span>
        </Typography>
      </motion.div>
    </Box>
  );
};

export default AutoCounter;
