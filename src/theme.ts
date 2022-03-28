import { extendTheme } from "@chakra-ui/react";
import { getColor } from "@chakra-ui/theme-tools";
import { theme as defaultTheme } from "@chakra-ui/theme";

const borderColor = getColor(defaultTheme, "whiteAlpha.400", "gray") as string;

export const wordleTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "blackAlpha.900",
      },
    },
  },
  borders: {
    "1px": `1px solid ${borderColor}`,
    "2px": `2px solid ${borderColor}`,
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
