import { AspectRatio, Box, HStack, VStack } from "@chakra-ui/react";
import { range } from "lodash";

export interface LetterGridProps {
  guesses: number;
  wordLength: number;
}

export function LetterGrid({ guesses, wordLength }: LetterGridProps) {
  return (
    <VStack width="100%">
      {range(0, guesses).map((guessNum) => (
        <HStack flex={1} width="100%" key={guessNum}>
          {range(0, wordLength).map((charNum) => (
            <AspectRatio key={charNum} flex={1} ratio={1}>
              <Box border="1px solid"></Box>
            </AspectRatio>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}
