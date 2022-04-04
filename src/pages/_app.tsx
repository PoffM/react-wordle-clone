import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { PropsWithChildren } from "react";
import { WordleThemeProvider } from "../theme/WordleThemeProvider";

/** Wrapper with all context providers. */
export function AppWrapper({ children }: PropsWithChildren<unknown>) {
  return (
    <ChakraProvider>
      <WordleThemeProvider>{children}</WordleThemeProvider>
    </ChakraProvider>
  );
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
}
