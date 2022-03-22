import { Box, Center, Flex } from "@chakra-ui/react";
import { range } from "lodash";
import type { NextPage } from "next";
import Head from "next/head";
import { useKey } from "react-use";
import { LetterGrid } from "../components/LetterGrid/LetterGrid";
import { WordleHeader } from "../components/WordleHeader/WordleHeader";
import { useWordleState } from "../hooks/useWordleState/useWordleState";

const ALPHABET = range(0, 26).map((i) => String.fromCharCode(i + 65));

const Home: NextPage = () => {
  const {
    wordleState,
    addLetterToGuess,
    removeLastLetterFromGuess,
    submitGuess,
  } = useWordleState();

  // Key presses change the game state:
  useKey(
    (event) => ALPHABET.includes(event.key.toUpperCase()),
    (event) => addLetterToGuess(event.key.toUpperCase().charCodeAt(0))
  );
  useKey("Backspace", removeLastLetterFromGuess);
  useKey("Enter", submitGuess);

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
            <LetterGrid wordleState={wordleState} />
          </Center>
          <Box h="13rem" bg="gray"></Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
