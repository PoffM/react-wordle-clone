import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { wordleTheme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={wordleTheme}>
      <ColorModeProvider options={{ initialColorMode: "dark" }}>
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
