import { isMobile, isTablet, isDesktop } from "mobile-device-detect";

// Custom function to check if the device is a laptop
const isLaptop = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  return (
    !isMobile &&
    !isTablet &&
    !isDesktop &&
    (userAgent.includes("macintosh") ||
      userAgent.includes("macbook") ||
      userAgent.includes("windows") ||
      userAgent.includes("linux") ||
      userAgent.includes("chrome") && !isMobile)
  );
};

const getDeviceType = () => {
  if (isMobile) {
    if (navigator.userAgent.includes("Android")) return "android";
    if (navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad") || navigator.userAgent.includes("iPod")) return "ios";
    return "smartphone - unknown OS";
  }
  if (isTablet) return "tablet";
  if (isLaptop()) return "laptop";
  if (isDesktop) return "desktop";
  return "unknown";
};

export default getDeviceType; 
