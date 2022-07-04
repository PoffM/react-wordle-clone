import { Box, Center, Flex, useToast } from "@chakra-ui/react";
import { get, range } from "lodash";
import { useEffect } from "react";
import { useWordleState, WordleStateParams } from "../hooks/useWordleState";
import { KeyboardButtons } from "./KeyboardButtons";
import { LetterGrid } from "./letter-grid/LetterGrid";
import { PostGameButtons } from "./PostGameButtons";

const ALPHABET = range(0, 26).map((i) => String.fromCharCode(i + 65));

/** Holds the game state and renders the game elements. */
export function WordleGame(params: WordleStateParams) {
  const toast = useToast({
    duration: 2000,
    position: "top",
    variant: "solid",
  });

  const {
    wordleState,
    addLetterToGuess,
    removeLastLetterFromGuess,
    submitGuess,
    continueGame,
    restart,
  } = useWordleState(params);

  // Show a toast if there is a guessing error:
  useEffect(() => {
    if (wordleState.currentGuessError) {
      toast({
        description: wordleState.currentGuessError.message,
        status: "warning",
      });
    }
    // Don't put 'toast' as a dependency because its identity changes on every render:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordleState.currentGuessError]);

  // Key presses change the game state:
  useEffect(() => {
    function callGameFunction(event: KeyboardEvent) {
      if (ALPHABET.includes(event.key.toUpperCase())) {
        addLetterToGuess?.(event.key.toUpperCase().charCodeAt(0));
      }
      if (event.key === "Backspace") {
        removeLastLetterFromGuess?.();
      }
      if (
        event.key === "Enter" &&
        // Don't submit the guess if the user is tabbed to a button,
        // e.g. navigating the page keyboard-only:
        get(event.target, "type") !== "button"
      ) {
        submitGuess?.();
      }
    }
    document.addEventListener("keydown", callGameFunction);
    return () => document.removeEventListener("keydown", callGameFunction);
  }, [addLetterToGuess, removeLastLetterFromGuess, submitGuess]);

  // Defocus the button after clicking it,
  useEffect(() => {
    function blurElement() {
      // eslint-disable-next-line
      (document.activeElement as any)?.blur?.();
    }
    document.addEventListener("click", blurElement);
    return () => document.removeEventListener("click", blurElement);
  }, []);

  // Only reveal the new colors on the keyboard UI after the letter box colors have been revealed:
  const revealedGuesses =
    wordleState.status === "REVEALING"
      ? wordleState.submittedGuesses.slice(0, -1)
      : wordleState.submittedGuesses;

  return (
    <Flex width="100%" maxW="31rem" height="100%" flexDirection="column">
      <Center flex={1}>
        <LetterGrid wordleState={wordleState} onRowRevealed={continueGame} />
      </Center>
      <Box h="12rem">
        {(wordleState.status === "WON" || wordleState.status === "LOST") && (
          <PostGameButtons onRestartClick={restart} wordleState={wordleState} />
        )}
        {(wordleState.status === "GUESSING" ||
          wordleState.status === "REVEALING") && (
          <KeyboardButtons
            submittedGuesses={revealedGuesses}
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
