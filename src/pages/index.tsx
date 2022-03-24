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

      <style>{`
        html, body, #__next {
          height: 100%;
          margin: 0;
        }
      `}</style>
      <Flex direction="column" h="100%">
        <WordleHeader />
        <WordleGame />
      </Flex>
    </>
  );
};

export default Home;
