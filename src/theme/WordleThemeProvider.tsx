import { GlobalStyle, ThemeProvider, useColorMode } from "@chakra-ui/react";
import { PropsWithChildren, useMemo } from "react";
import { wordleTheme } from "./theme";

export function WordleThemeProvider({ children }: PropsWithChildren<unknown>) {
  const { colorMode } = useColorMode();

  // Only recreate the theme on color mode change:
  const theme = useMemo(() => wordleTheme(colorMode), [colorMode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
