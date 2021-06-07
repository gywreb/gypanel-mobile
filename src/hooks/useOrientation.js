import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { LANDSCAPE, PORTRAIT } from "../configs/constants";

export function useOrientation() {
  const [orientation, setOrientation] = useState(PORTRAIT);

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation(PORTRAIT);
      } else {
        setOrientation(LANDSCAPE);
      }
    });
  }, []);

  return orientation;
}
