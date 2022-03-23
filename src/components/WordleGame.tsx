import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { range } from "lodash";
import { useKey } from "react-use";
import { useWordleState } from "../hooks/useWordleState";
import { KeyboardButtons } from "./KeyboardButtons";
import { LetterGrid } from "./LetterGrid";

const ALPHABET = range(0, 26).map((i) => String.fromCharCode(i + 65));

/** Holds the game state and renders the game elements. */
export function WordleGame() {
  const {
    wordleState,
    addLetterToGuess,
    removeLastLetterFromGuess,
    submitGuess,
    restart,
  } = useWordleState();

  // Key presses change the game state:
  useKey(
    (event) => ALPHABET.includes(event.key.toUpperCase()),
    (event) => addLetterToGuess?.(event.key.toUpperCase().charCodeAt(0))
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
      <Box h="13rem">
        {(wordleState.status === "WON" || wordleState.status === "LOST") && (
          <VStack>
            {wordleState.status === "LOST" && (
              <Box textAlign="center">
                <Heading size="sm">SOLUTION</Heading>
                <Text fontSize="3xl">{wordleState.solution}</Text>
              </Box>
            )}
            <Flex w="100%">
              <Button
                flex={1}
                bg="green.600"
                _hover={{ bg: "green.700" }}
                onClick={restart}
              >
                Next Word
              </Button>
            </Flex>
          </VStack>
        )}
        {wordleState.status === "PLAYING" && <KeyboardButtons />}
      </Box>
    </Flex>
  );
}
