import { useState, useEffect } from "react"

const screenType = {
  PHONE: "phone",
  TABLET: "tablet",
  DESKTOP: "desktop",
  BIG_DESKTOP: "big-desktop",
};

export default function useScreen() {
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(function checkWidnowResize() {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);

    return function cleanupEventListener() {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  const screen = (
    windowSize.width === undefined || windowSize.width < 600 ? screenType.PHONE :
    windowSize.width <= 1200 ? screenType.TABLET :
    windowSize.width > 1200 && windowSize.width <= 1920 ? screenType.DESKTOP :
    screenType.BIG_DESKTOP
  );

  return {
    isPhone: () =>
      screen === screenType.PHONE,
    isTablet: () =>
      screen === screenType.TABLET,
    isDesktop: () =>
      screen === screenType.DESKTOP,
    isBigDesktop: () =>
      screen === screenType.BIG_DESKTOP,
  };
}

function getSize() {
  const isClient = typeof window === "object";
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient? window.innerHeight : undefined,
  };
}

