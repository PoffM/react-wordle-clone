import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { flatMap } from "lodash";
import { ComponentProps } from "react";

export interface KeyboardButtonsProps {
  onLetterClick?: (charCode: number) => void;
  onEnterClick?: () => void;
  onBackspaceClick?: () => void;
  submittedGuesses: string[];
  solution: string;
}

export function KeyboardButtons({
  onLetterClick,
  onEnterClick,
  onBackspaceClick,
  submittedGuesses,
  solution,
}: KeyboardButtonsProps) {
  const spacing = 1.5;

  const hStackProps = {
    spacing,
    width: "100%",
    flex: 1,
  };

  const submittedLetters = flatMap(
    submittedGuesses
      .map((guess) => guess.split(""))
      .map((letters) => letters.map((letter, index) => ({ letter, index })))
  );

  const submittedLettersSet = new Set(submittedLetters.map((it) => it.letter));

  const correctLetters = new Set(
    submittedLetters
      .filter(({ letter, index }) => solution[index] === letter)
      .map((it) => it.letter)
  );

  const misplacedLetters = new Set(
    submittedLetters
      .filter(
        ({ letter }) => solution.includes(letter) && !correctLetters.has(letter)
      )
      .map((it) => it.letter)
  );

  function letterButtonProps(letter: string) {
    const buttonColor = correctLetters.has(letter)
      ? "correct"
      : misplacedLetters.has(letter)
      ? "misplaced"
      : submittedLettersSet.has(letter)
      ? "usedLetter"
      : "unusedLetter";

    return {
      letter,
      onClick: onLetterClick,
      buttonProps: colorProps(buttonColor),
    };
  }

  return (
    <VStack h="100%" spacing={spacing}>
      <HStack {...hStackProps}>
        {"QWERTYUIOP".split("").map((letter) => (
          <LetterButton {...letterButtonProps(letter)} key={letter} />
        ))}
      </HStack>
      <HStack {...hStackProps}>
        <Box flex={0.5} />
        {"ASDFGHJKL".split("").map((letter) => (
          <LetterButton {...letterButtonProps(letter)} key={letter} />
        ))}
        <Box flex={0.5} />
      </HStack>
      <HStack {...hStackProps}>
        <KeyButton flex={1.65} onClick={onEnterClick}>
          ENTER
        </KeyButton>
        {"ZXCVBNM".split("").map((letter) => (
          <LetterButton {...letterButtonProps(letter)} key={letter} />
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
  buttonProps?: ComponentProps<typeof Button>;
}

/** A letter button on the clickable keyboard. */
function LetterButton({ letter, onClick, buttonProps }: LetterButtonProps) {
  return (
    <KeyButton
      key={letter}
      flex={1}
      onClick={() => onClick?.(letter.charCodeAt(0))}
      {...buttonProps}
    >
      {letter}
    </KeyButton>
  );
}

/** A button on the clickable keyboard. */
function KeyButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      height="100%"
      minW={0}
      p={0}
      {...colorProps("unusedLetter")}
      {...props}
    />
  );
}

function colorProps(color: string) {
  return {
    bg: `${color}`,
    _hover: { bg: `${color}.hover` },
    _active: { bg: `${color}.active` },
  };
}
