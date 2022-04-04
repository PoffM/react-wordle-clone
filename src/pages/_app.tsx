import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { wordleTheme } from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={wordleTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
