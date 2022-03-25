import { Box, Center, Flex, useToast } from "@chakra-ui/react";
import { range } from "lodash";
import { useEffect } from "react";
import { useKey } from "react-use";
import { useWordleState } from "../hooks/useWordleState";
import { KeyboardButtons } from "./KeyboardButtons";
import { LetterGrid } from "./letter-grid/LetterGrid";
import { PostGameButtons } from "./PostGameButtons";

const ALPHABET = range(0, 26).map((i) => String.fromCharCode(i + 65));

/** Holds the game state and renders the game elements. */
export function WordleGame() {
  const toast = useToast({
    duration: 2000,
    position: "top",
  });

  const {
    wordleState,
    addLetterToGuess,
    removeLastLetterFromGuess,
    submitGuess,
    restart,
  } = useWordleState();

  // Show a toast if there is a guessing error:
  useEffect(() => {
    if (wordleState.currentGuessError) {
      toast({
        description: wordleState.currentGuessError.message,
        status: "warning",
      });
    }
  }, [wordleState.currentGuessError, toast]);

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
      maxW="31rem"
      flex={1}
      flexDirection="column"
    >
      <Center flex={1}>
        <LetterGrid wordleState={wordleState} />
      </Center>
      <Box h="12rem">
        {(wordleState.status === "WON" || wordleState.status === "LOST") && (
          <PostGameButtons onRestartClick={restart} wordleState={wordleState} />
        )}
        {wordleState.status === "PLAYING" && (
          <KeyboardButtons
            submittedGuesses={wordleState.submittedGuesses}
            solution={wordleState.solution}
            onLetterClick={addLetterToGuess}
            onBackspaceClick={removeLastLetterFromGuess}
            onEnterClick={submitGuess}
          />
        )}
      </Box>
    </Flex>
  );
}
