import { extendTheme } from "@chakra-ui/react";
import { ChakraTheme } from "@chakra-ui/theme";

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
    gray: {
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
    },
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
    misplaced: {
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
    },
    // Mid-Gray for unused letters:
    unusedLetter: {
      50: "#feeef2",
      100: "#feeef2",
      200: "#d2dbdb",
      300: "#bbc1c1",
      400: "#a4a6a8",
      500: "#8b8d8e",
      600: "#717374",
      700: "#575a5a",
      800: "#3d4043",
      900: "#26262b",
    },
    // Dark gray for used letters:
    usedLetter: {
      50: "#bebec0",
      100: "#a4a4a6",
      200: "#8a8a8c",
      300: "#717173",
      400: "#58585a",
      500: "#3f3f41",
      600: "#262629",
      700: "#150a0d",
      800: "#150a0d",
      900: "#150a0d",
    },
  },
};

export const wordleTheme = extendTheme(wordleThemeOverride);
