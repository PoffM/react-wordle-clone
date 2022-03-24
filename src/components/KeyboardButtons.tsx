import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { ComponentProps } from "react";

export interface KeyboardButtonsProps {
  onLetterClick?: (charCode: number) => void;
  onEnterClick?: () => void;
  onBackspaceClick?: () => void;
}

export function KeyboardButtons({
  onLetterClick,
  onEnterClick,
  onBackspaceClick,
}: KeyboardButtonsProps) {
  const spacing = 1.5;

  const hStackProps = {
    spacing,
    width: "100%",
    flex: 1,
  };

  return (
    <VStack h="100%" spacing={spacing}>
      <HStack {...hStackProps}>
        {"QWERTYUIOP".split("").map((letter) => (
          <LetterButton letter={letter} onClick={onLetterClick} key={letter} />
        ))}
      </HStack>
      <HStack {...hStackProps}>
        <Box flex={0.5} />
        {"ASDFGHJKL".split("").map((letter) => (
          <LetterButton letter={letter} onClick={onLetterClick} key={letter} />
        ))}
        <Box flex={0.5} />
      </HStack>
      <HStack {...hStackProps}>
        <KeyButton flex={1.65} onClick={onEnterClick}>
          ENTER
        </KeyButton>
        {"ZXCVBNM".split("").map((letter) => (
          <LetterButton letter={letter} onClick={onLetterClick} key={letter} />
        ))}
        <KeyButton flex={1.65} onClick={onBackspaceClick}>
          BACK
        </KeyButton>
      </HStack>
    </VStack>
  );
}

interface LetterButtonProps {
  letter: string;
  onClick?: (charCode: number) => void;
}

function LetterButton({ letter, onClick }: LetterButtonProps) {
  return (
    <KeyButton
      key={letter}
      flex={1}
      onClick={() => onClick?.(letter.charCodeAt(0))}
    >
      {letter}
    </KeyButton>
  );
}

function KeyButton(props: ComponentProps<typeof Button>) {
  return <Button height="100%" minW={0} p={0} {...props} />;
}
