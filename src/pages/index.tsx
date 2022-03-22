import { Box, Center, Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { LetterGrid } from "../components/LetterGrid/LetterGrid";
import { WordleHeader } from "../components/WordleHeader/WordleHeader";

const Home: NextPage = () => {
  const guesses = 6;
  const wordLength = 5;

  return (
    <>
      <Head>
        <title>React Wordle Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style>{`
        html, body, #__next {
          height: 100%;
        }
      `}</style>
      <Flex direction="column" h="100%">
        <WordleHeader />
        <Flex
          as="main"
          alignSelf="center"
          width="100%"
          maxW="25rem"
          flex={1}
          flexDirection="column"
        >
          <Center flex={1}>
            <LetterGrid guesses={guesses} wordLength={wordLength} />
          </Center>
          <Box h="13rem" bg="gray"></Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
