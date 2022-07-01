import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { WordleGame } from "../components/WordleGame";
import { WordleHeader } from "../components/WordleHeader";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>React Wordle Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* CSS hacks to get the vertical layout to work. */}
      <style>{`
        html, body, #__next {
          height: 100%;
          margin: 0;
        }

        /* Move the toasts (notifications) down so they don't cover the header. */
        #chakra-toast-manager-top {
          top: 10% !important;
        }
      `}</style>
      <Flex direction="column" h="100%">
        <WordleHeader />
        <Flex as="main" flex={1} justifyContent="center">
          <WordleGame />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
