import { AspectRatio, Box, HStack, VStack } from "@chakra-ui/react";
import { range } from "lodash";
import { WordleState } from "../hooks/useWordleState";

export interface LetterGridProps {
  wordleState: WordleState;
}

export function LetterGrid({ wordleState }: LetterGridProps) {
  const { maxGuesses, wordLength, currentGuess, submittedGuesses, hiddenWord } =
    wordleState;

  return (
    <VStack width="100%">
      {range(0, maxGuesses).map((rowNum) => {
        const isCurrentGuess = rowNum === submittedGuesses.length;
        const isSubmitted = Boolean(submittedGuesses[rowNum]);
        const rowGuess = isCurrentGuess
          ? currentGuess
          : submittedGuesses[rowNum];

        const remainingLetters = range(0, hiddenWord.length)
          .filter((idx) => rowGuess?.[idx] !== hiddenWord[idx])
          .map((idx) => hiddenWord[idx]);

        return (
          <HStack flex={1} width="100%" key={rowNum}>
            {range(0, wordLength).map((colNum) => {
              const boxLetter = rowGuess?.charAt(colNum);
              const letterIsInRemainingLetters = Boolean(
                boxLetter && remainingLetters.includes(boxLetter)
              );
              const letterIsInRightSpot = Boolean(
                boxLetter && hiddenWord.charAt(colNum) === boxLetter
              );

              const bgColor = isSubmitted
                ? letterIsInRightSpot
                  ? "green.600"
                  : letterIsInRemainingLetters
                  ? "yellow.500"
                  : "gray.700"
                : undefined;

              return (
                <AspectRatio key={colNum} flex={1} ratio={1}>
                  <Box
                    border="1px solid"
                    bg={bgColor}
                    userSelect="none"
                    fontWeight="bold"
                    fontSize="2.2rem"
                  >
                    {boxLetter}
                  </Box>
                </AspectRatio>
              );
            })}
          </HStack>
        );
      })}
    </VStack>
  );
}
