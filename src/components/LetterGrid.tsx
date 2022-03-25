import { AspectRatio, Box, HStack, VStack } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { range } from "lodash";
import { ComponentProps, useEffect } from "react";
import { WordleState } from "../hooks/useWordleState";

export interface LetterGridProps {
  wordleState: WordleState;
}

export function LetterGrid({ wordleState }: LetterGridProps) {
  const { rows } = useLetterGridData({ wordleState });

  return (
    <VStack width="100%" maxW="21rem">
      {rows.map((rowData, rowNum) => (
        <LetterGridRow {...rowData} key={rowNum} />
      ))}
    </VStack>
  );
}

interface LetterGridRowData {
  columnData: {
    bgColor: string | undefined;
    letter: string | undefined;
  }[];
  rowError: { message: string } | null;
}

const MotionHStack = motion<ComponentProps<typeof HStack>>(HStack);

function LetterGridRow({ columnData, rowError }: LetterGridRowData) {
  // Shake horizontally when there is a new error:
  const controls = useAnimation();
  useEffect(() => {
    if (rowError) {
      void controls.start({
        translateX: [0, -1, 2, -4, 4, -4, 4, -4, 2, -1, 0],
        transition: { duration: 0.6 },
      });
    }
  }, [controls, rowError]);

  return (
    <MotionHStack animate={controls} flex={1} width="100%">
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
    </MotionHStack>
  );
}

function useLetterGridData({ wordleState }: LetterGridProps) {
  const {
    maxGuesses,
    wordLength,
    currentGuess,
    submittedGuesses,
    solution,
    currentGuessError,
  } = wordleState;

  const rows = range(0, maxGuesses).map((rowNum) => {
    const isCurrentGuess = rowNum === submittedGuesses.length;
    const isSubmitted = Boolean(submittedGuesses[rowNum]);
    const rowGuess = isCurrentGuess ? currentGuess : submittedGuesses[rowNum];

    const remainingLetters = range(0, solution.length)
      .filter((idx) => rowGuess?.[idx] !== solution[idx])
      .map((idx) => solution[idx]);

    const rowError = isCurrentGuess ? currentGuessError : null;

    const rowData: LetterGridRowData = {
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
      rowError,
    };

    return rowData;
  });

  return { rows };
}
