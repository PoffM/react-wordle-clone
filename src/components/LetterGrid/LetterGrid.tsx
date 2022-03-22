import { AspectRatio, Box, HStack, VStack } from "@chakra-ui/react";
import { range } from "lodash";
import { WordleState } from "../../hooks/useWordleState/useWordleState";

export interface LetterGridProps {
  wordleState: WordleState;
}

export function LetterGrid({ wordleState }: LetterGridProps) {
  const { maxGuesses, wordLength, currentGuess, submittedGuesses } =
    wordleState;

  return (
    <VStack width="100%">
      {range(0, maxGuesses).map((rowNum) => {
        const isCurrentGuess = rowNum === submittedGuesses.length;
        const isSubmitted = !!submittedGuesses[rowNum];
        const rowGuess = isCurrentGuess
          ? currentGuess
          : submittedGuesses[rowNum];

        return (
          <HStack flex={1} width="100%" key={rowNum}>
            {range(0, wordLength).map((colNum) => {
              return (
                <AspectRatio key={colNum} flex={1} ratio={1}>
                  <Box
                    border="1px solid"
                    bg={isSubmitted ? "gray.700" : undefined}
                    userSelect="none"
                  >
                    {rowGuess?.charAt(colNum)}
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
