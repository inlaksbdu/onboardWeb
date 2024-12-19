import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SigninComponent from "../../components/onboardingpages/SigninComponent";
import Tabbar from "../../components/Tabbar";
import FaceRecognition from "../../components/onboardingpages/FaceRecognition";
import DocumentScanning from "../../components/onboardingpages/DocumentScanning";
import PersonalInformation from "../../components/onboardingpages/PersonalInformation";
function OnboardingLayout() {
  const [currentTab, setCurrentTab] = useState(() => {
    return localStorage.getItem("currentTab") || "tab1";
  });
  const [direction, setDirection] = useState(0);

  // Update localStorage whenever the tab changes
  useEffect(() => {
    localStorage.setItem("currentTab", currentTab);
  }, [currentTab]);

  // Handle tab change with direction
  const changeTab = (newTab) => {
    if (newTab === currentTab) return;

    // Determine swipe direction based on tab order
    const tabs = ["tab1", "tab2", "tab3", "tab4"];
    const newDirection = tabs.indexOf(newTab) > tabs.indexOf(currentTab) ? 1 : -1;
    setDirection(newDirection);

    setCurrentTab(newTab);
  };

  // Animation variants for tab transitions
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,  // New tab comes in from the right or left
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: direction==0?0: 0.5, ease: "easeInOut" }, // Smooth transition
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,  // Current tab moves out to the left or right
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    }),
  };

  return (
    <div className="w-full flex justify-center items-center   h-screen   flex-col  overflow-x-hidden">
      <Tabbar currentTab={currentTab} setTab={changeTab} />

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={currentTab}
          className="w-full flex justify-center items-center  h-full  "
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
        >         
          {currentTab === "tab1" && <SigninComponent setTab={changeTab} />}
          {currentTab === "tab2" && <FaceRecognition setTab={changeTab} />}
          {currentTab === "tab3" && <DocumentScanning setTab={changeTab} />}
          {currentTab === "tab4" && <PersonalInformation setTab={changeTab} />}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default OnboardingLayout;
