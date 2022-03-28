import { extendTheme } from "@chakra-ui/react";

export const wordleTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "blackAlpha.900",
      },
    },
  },
  semanticTokens: {
    colors: {
      correct: "green.600",
      "correct.hover": "green.700",
      "correct.active": "green.800",
      misplaced: "yellow.500",
      "misplaced.hover": "yellow.600",
      "misplaced.active": "yellow.700",
      usedLetter: "whiteAlpha.300",
      "usedLetter.hover": "whiteAlpha.200",
      "usedLetter.active": "whiteAlpha.100",
      unusedLetter: "whiteAlpha.600",
      "unusedLetter.hover": "whiteAlpha.500",
      "unusedLetter.active": "whiteAlpha.400",
    },
  },
});
