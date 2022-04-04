import {
  AspectRatio,
  Box,
  BoxProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export interface LetterBoxData {
  letterIsInRightSpot?: boolean;
  letterIsInRemainingLetters?: boolean;
  letter?: string;
}

export interface LetterBoxProps extends LetterBoxData {
  isSubmitted: boolean;
  revealDelaySeconds?: number;
  onRevealed?: () => void;
  /** Renders the letter box with the solution color already revealed. */
  initiallyRevealed?: boolean;
}

const MotionBox = motion<BoxProps>(Box);

export function LetterBox({
  letterIsInRightSpot,
  letterIsInRemainingLetters,
  letter,
  isSubmitted,
  revealDelaySeconds,
  onRevealed,
  initiallyRevealed = false,
}: LetterBoxProps) {
  const textColor = useColorModeValue(undefined, "whiteAlpha.900");
  const hasLetterBorderColor = useColorModeValue(
    "blackAlpha.600",
    "whiteAlpha.600"
  );
  const animation = useAnimation();

  // Pop-in animation when the letter is entered:
  useEffect(() => {
    void (async () => {
      if (letter) {
        await animation.start({
          scale: [0.8, 1.1, 1],
          transition: { times: [0, 0.4, 1], duration: 0.1 },
        });
      }
    })();
  }, [animation, letter]);

  // Flip animation to reveal the answer:
  const [revealed, setRevealed] = useState(initiallyRevealed);
  useEffect(() => {
    void (async () => {
      if (isSubmitted && !revealed) {
        await animation.start({
          rotateX: [0, -90],
          transition: { delay: revealDelaySeconds, duration: 0.2 },
        });
        setRevealed(true);
        await animation.start({
          rotateX: [-90, 0],
          transition: { duration: 0.2 },
        });
        onRevealed?.();
      }
    })();
  }, [animation, isSubmitted, revealed, revealDelaySeconds, onRevealed]);

  const bgColor = revealed
    ? letterIsInRightSpot
      ? "correct.500"
      : letterIsInRemainingLetters
      ? "misplaced.500"
      : "usedLetter.500"
    : undefined;

  return (
    <AspectRatio flex={1} ratio={1}>
      <MotionBox
        data-testid="letter-box"
        data-background-color={bgColor}
        data-revealed={revealed}
        animate={animation}
        borderWidth={revealed ? undefined : "2px"}
        borderColor={letter && hasLetterBorderColor}
        bg={bgColor}
        color={revealed ? "whiteAlpha.900" : textColor}
        userSelect="none"
        fontWeight="bold"
        fontSize="2rem"
      >
        {letter}
      </MotionBox>
    </AspectRatio>
  );
}
