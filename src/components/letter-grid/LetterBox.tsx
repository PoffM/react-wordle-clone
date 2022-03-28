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
}

const MotionBox = motion<BoxProps>(Box);

export function LetterBox({
  letterIsInRightSpot,
  letterIsInRemainingLetters,
  letter,
  isSubmitted,
  revealDelaySeconds,
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
          transition: { delay: revealDelaySeconds, duration: 0.25 },
        });
        setRevealed(true);
        await animation.start({
          rotateX: [-90, 0],
          transition: { duration: 0.25 },
        });
      }
    })();
  }, [animation, isSubmitted, revealed, revealDelaySeconds]);

  const bgColor = revealed
    ? letterIsInRightSpot
      ? "correct"
      : letterIsInRemainingLetters
      ? "misplaced"
      : "usedLetter"
    : undefined;

  return (
    <AspectRatio flex={1} ratio={1}>
      <MotionBox
        animate={animation}
        border={revealed ? undefined : "2px"}
        bg={revealed ? bgColor : undefined}
        userSelect="none"
        fontWeight="bold"
        fontSize="2rem"
      >
        {letter}
      </MotionBox>
    </AspectRatio>
  );
}
