import { HStack } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { range } from "lodash";
import { ComponentProps, useEffect } from "react";
import { LetterBox } from "./LetterBox";

export interface LetterGridRowProps {
  rowGuess?: string;
  solution: string;
  rowError?: { message: string } | null;
  isSubmitted: boolean;
  onRowRevealed?: () => void;
  /** Renders the letter boxes with the solution color already revealed. */
  initiallyRevealed?: boolean;
}

const MotionHStack = motion<ComponentProps<typeof HStack>>(HStack);

export function LetterGridRow({
  isSubmitted,
  solution,
  onRowRevealed,
  rowError,
  rowGuess,
  initiallyRevealed,
}: LetterGridRowProps) {
  // Shake horizontally when there is a new error:
  const animation = useAnimation();
  useEffect(() => {
    if (rowError) {
      void animation.start({
        translateX: [0, -1, 2, -4, 4, -4, 4, -4, 2, -1, 0],
        transition: { duration: 0.6 },
      });
    }
  }, [animation, rowError]);

  const remainingLetters = range(0, solution.length)
    .filter((idx) => rowGuess?.[idx] !== solution[idx])
    .map((idx) => solution[idx]);

  const columnData = range(0, solution.length).map((colNum) => {
    const letter = rowGuess?.charAt(colNum);
    const letterIsInRemainingLetters = Boolean(
      letter && remainingLetters.includes(letter)
    );
    const letterIsInRightSpot = Boolean(
      letter && solution.charAt(colNum) === letter
    );

    return { letter, letterIsInRightSpot, letterIsInRemainingLetters };
  });

  return (
    <MotionHStack
      data-testid="letter-grid-row"
      animate={animation}
      flex={1}
      width="100%"
      spacing="0.3rem"
    >
      {columnData.map((letterBoxData, letterPosition) => {
        const isLast = letterPosition === columnData.length - 1;

        return (
          <LetterBox
            {...letterBoxData}
            isSubmitted={isSubmitted}
            revealDelaySeconds={letterPosition * (1 / columnData.length)}
            onRevealed={isLast ? onRowRevealed : undefined}
            key={letterPosition}
            initiallyRevealed={initiallyRevealed}
          />
        );
      })}
    </MotionHStack>
  );
}
