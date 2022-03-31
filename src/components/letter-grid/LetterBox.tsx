import { AspectRatio, Box, BoxProps } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export interface LetterBoxData {
  letterIsInRightSpot: boolean;
  letterIsInRemainingLetters: boolean;
  letter?: string;
}

export interface LetterBoxProps extends LetterBoxData {
  isSubmitted: boolean;
  revealDelaySeconds?: number;
  onRevealed?: () => void;
}

const MotionBox = motion<BoxProps>(Box);

export function LetterBox({
  letterIsInRightSpot,
  letterIsInRemainingLetters,
  letter,
  isSubmitted,
  revealDelaySeconds,
  onRevealed,
}: LetterBoxProps) {
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
  const [revealed, setRevealed] = useState(false);
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
        border={revealed ? undefined : "2px"}
        bg={bgColor}
        userSelect="none"
        fontWeight="bold"
        fontSize="2rem"
      >
        {letter}
      </MotionBox>
    </AspectRatio>
  );
}
