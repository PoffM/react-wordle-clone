import { AspectRatio, Box, HStack } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { ComponentProps, useEffect } from "react";

export interface LetterGridRowProps {
  columnData: {
    bgColor: string | undefined;
    letter: string | undefined;
  }[];
  rowError: { message: string } | null;
}

const MotionHStack = motion<ComponentProps<typeof HStack>>(HStack);

export function LetterGridRow({ columnData, rowError }: LetterGridRowProps) {
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
