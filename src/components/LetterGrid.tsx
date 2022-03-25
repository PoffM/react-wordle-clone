import { VStack } from "@chakra-ui/react";
import { range } from "lodash";
import { WordleState } from "../hooks/useWordleState";
import { LetterGridRow, LetterGridRowProps } from "./LetterGridRow";

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

    const rowData: LetterGridRowProps = {
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
      isSubmitted,
    };

    return rowData;
  });

  return { rows };
}
