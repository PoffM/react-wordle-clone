import { Box, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { WordleGame } from "../components/WordleGame";
import { WordleHeader } from "../components/WordleHeader";

const Home: NextPage = () => {
  return (
    <Box
      // 100% viewport height trick:
      position="fixed"
      inset={0}
    >
      <Head>
        <title>React Wordle Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style>{`
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
    </Box>
  );
};

export default Home;
