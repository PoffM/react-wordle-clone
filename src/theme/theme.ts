import { extendTheme } from "@chakra-ui/react";
import { ChakraTheme } from "@chakra-ui/theme";
import { skewColor } from "./theme-utils";

const gray = {
  50: "#f2f2f3",
  100: "#d8d8d8",
  200: "#bebebe",
  300: "#a3a3a3",
  400: "#898989",
  500: "#707070",
  600: "#575757",
  700: "#3e3e3e",
  800: "#252525",
  900: "#0c0c0d",
};

const misplaced = {
  50: "#fcf6e1",
  100: "#ede5c0",
  200: "#e0d49c",
  300: "#d3c377",
  400: "#c7b252",
  500: "#ad9838",
  600: "#87762a",
  700: "#60541c",
  800: "#3a330e",
  900: "#151100",
};

/** Overrides the default Chakra theme. */
const wordleThemeOverride: Partial<ChakraTheme> = {
  config: {
    initialColorMode: "system",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "white",
      },
      "*, *::before, &::after": {
        borderColor:
          props.colorMode === "dark" ? "whiteAlpha.400" : "blackAlpha.400",
      },
    }),
  },
  // Color palettes generated with https://smart-swatch.netlify.app .
  colors: {
    // Override the default blueish gray with a more pure gray color:
    gray,
    // Correct green:
    correct: {
      50: "#e8f9e8",
      100: "#cce5cb",
      200: "#aed3ab",
      300: "#8fbf8b",
      400: "#70ad6b",
      500: "#579452",
      600: "#43733f",
      700: "#2e522b",
      800: "#1a3218",
      900: "#021200",
    },
    // Misplaced yellow:
    misplacedLight: skewColor(misplaced, -1),
    misplacedDark: misplaced,
    // Mid-Gray for unused letters:
    unusedLetterDark: gray,
    unusedLetterLight: skewColor(gray, -4),
    // Dark gray for used letters:
    usedLetterLight: gray,
    usedLetterDark: skewColor(gray, 2),
  },
};

export const wordleTheme = extendTheme(wordleThemeOverride);
