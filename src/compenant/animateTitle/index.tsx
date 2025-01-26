import { useState, useEffect } from "react";
import * as motion from "motion/react-client";

const LoopingText = () => {
  const [textIndex, setTextIndex] = useState(0);

  const texts = [
    "Welcome to the Adventure!",
    "Explore Amazing Places",
    "Start Your Journey Today",
    "Travel with Us",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Change text in a loop
    }, 1500); // Change text every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <motion.div
      key={textIndex}
      style={{
        display: "inline-block",
        fontSize: "2rem",
        fontWeight: "bold",
        // color: "#1fd755", // Change color as needed
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: -20 }}
    //   exit={{ opacity: 0}}
      transition={{
        duration: 1,
        ease: "easeIn",
      }}
    >
      {texts[textIndex]}
    </motion.div>
  );
};

export default LoopingText;
