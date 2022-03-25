import { AspectRatio, Box, BoxProps } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

export interface LetterBoxData {
  bgColor?: string;
  letter?: string;
}

export interface LetterBoxProps extends LetterBoxData {
  isSubmitted: boolean;
  revealDelaySeconds?: number;
}

const MotionBox = motion<BoxProps>(Box);

export function LetterBox({
  bgColor,
  letter,
  isSubmitted,
  revealDelaySeconds,
}: LetterBoxProps) {
  // Flip animation to reveal the answer:
  const animation = useAnimation();
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

  return (
    <AspectRatio flex={1} ratio={1}>
      <MotionBox
        animate={animation}
        border="1px solid"
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
