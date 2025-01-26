import { Box, Stack } from "@mui/material";
import * as motion from "motion/react-client";
import { useAnimate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

export default function Index({ children }) {
  const scrollRef = useRef(null);
  const isInView = useInView(scrollRef, { once: true });
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isInView) {
      animate(
        scope.current,
        { opacity: 1, y: 0 },
        { duration: 0.5, delay: 0.25, ease: "easeIn" }
      );
    }
  }, [isInView]);
  return (
    <Box
      ref={scrollRef}
      sx={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        width: "fit-content",
      }}
    >
      <motion.div ref={scope} initial={{ opacity: 0, y: 75 }}>
        {children}
      </motion.div>

      <motion.div
        initial={{ x: 0 }}
        whileInView={{ x: "101%" }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          ease: "easeIn",
          delay: 0.25,
        }}
        style={{
          position: "absolute",
          top: 4,
          left: 0,
          bottom: 4,
          right: 0,
          width: "100%",
          backgroundColor: "#1fd755", // Sliding box color
          zIndex: 20, // Ensure it covers the text
        }}
      />
    </Box>
  );
}
