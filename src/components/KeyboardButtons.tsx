import { Button, HStack, Spacer, VStack } from "@chakra-ui/react";

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
    alignItems: "stretch",
  };

  return (
    <VStack h="100%" spacing={spacing}>
      <HStack {...hStackProps}>
        {"QWERTYUIOP".split("").map((letter) => (
          <LetterButton letter={letter} onClick={onLetterClick} key={letter} />
        ))}
      </HStack>
      <HStack {...hStackProps}>
        <Spacer flex={1.5} />
        {"ASDFGHJKL".split("").map((letter) => (
          <LetterButton letter={letter} onClick={onLetterClick} key={letter} />
        ))}
        <Spacer flex={1.5} />
      </HStack>
      <HStack {...hStackProps}>
        <Button height="100%" flex={3} onClick={onEnterClick}>
          ENTER
        </Button>
        {"ZXCVBNM".split("").map((letter) => (
          <LetterButton letter={letter} onClick={onLetterClick} key={letter} />
        ))}
        <Button height="100%" flex={3} onClick={onBackspaceClick}>
          BACK
        </Button>
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
    <Button
      height="100%"
      key={letter}
      flex={1}
      onClick={() => onClick?.(letter.charCodeAt(0))}
    >
      {letter}
    </Button>
  );
}
