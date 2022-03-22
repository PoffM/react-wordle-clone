import { Box, Center, Flex } from "@chakra-ui/react";
import { range } from "lodash";
import { useKey } from "react-use";
import { useWordleState } from "../../hooks/useWordleState/useWordleState";
import { LetterGrid } from "../LetterGrid/LetterGrid";

const ALPHABET = range(0, 26).map((i) => String.fromCharCode(i + 65));

export function WordleGame() {
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
  );
}
