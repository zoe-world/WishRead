import { useEffect, useState } from "react";

// window Resize hooks
type Windowsize = [number, number];

export const useWindowResize = (): Windowsize => {
  const initSize: Windowsize = [window.innerWidth, window.innerHeight];
  const [windowSize, setWindowSize] = useState<Windowsize>(initSize);
  useEffect(() => {
    const handleSize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);
  return windowSize;
};
