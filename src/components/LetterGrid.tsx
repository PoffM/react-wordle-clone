import { AspectRatio, Box, HStack, VStack } from "@chakra-ui/react";
import { range } from "lodash";
import { WordleState } from "../hooks/useWordleState";

export interface LetterGridProps {
  wordleState: WordleState;
}

export function LetterGrid({ wordleState }: LetterGridProps) {
  const { rowData } = useLetterGridData({ wordleState });

  return (
    <VStack width="100%" maxW="21rem">
      {rowData.map(({ columnData }, rowNum) => (
        <HStack flex={1} width="100%" key={rowNum}>
          {columnData.map(({ bgColor, letter }, colNum) => (
            <AspectRatio key={colNum} flex={1} ratio={1}>
              <Box
                key={colNum}
                border="1px solid"
                bg={bgColor}
                userSelect="none"
                fontWeight="bold"
                fontSize="2rem"
              >
                {letter}
              </Box>
            </AspectRatio>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

function useLetterGridData({ wordleState }: LetterGridProps) {
  const { maxGuesses, wordLength, currentGuess, submittedGuesses, solution } =
    wordleState;

  const rowData = range(0, maxGuesses).map((rowNum) => {
    const isCurrentGuess = rowNum === submittedGuesses.length;
    const isSubmitted = Boolean(submittedGuesses[rowNum]);
    const rowGuess = isCurrentGuess ? currentGuess : submittedGuesses[rowNum];

    const remainingLetters = range(0, solution.length)
      .filter((idx) => rowGuess?.[idx] !== solution[idx])
      .map((idx) => solution[idx]);

    return {
      columnData: range(0, wordLength).map((colNum) => {
        const letter = rowGuess?.charAt(colNum);
        const letterIsInRemainingLetters = Boolean(
          letter && remainingLetters.includes(letter)
        );
        const letterIsInRightSpot = Boolean(
          letter && solution.charAt(colNum) === letter
        );

        const bgColor = isSubmitted
          ? letterIsInRightSpot
            ? "green.600"
            : letterIsInRemainingLetters
            ? "yellow.500"
            : "gray.700"
          : undefined;

        return { bgColor, letter };
      }),
    };
  });

  return { rowData };
}
