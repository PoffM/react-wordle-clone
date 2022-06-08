import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
} from "@chakra-ui/react";
import { LetterGridRow } from "./letter-grid/LetterGridRow";

export function WordleInfoModal({
  isOpen,
  onClose,
}: Pick<ModalProps, "isOpen" | "onClose">) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>How to Play</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" gap={2}>
            <Text>Guess the WORDLE in six tries.</Text>
            <Text>
              Each guess must be a valid five-letter word. Hit the enter button
              to submit.
            </Text>
            <Text>
              After each guess, the color of the tiles will change to show how
              close your guess was to the word.
            </Text>
            <Divider />
            <Flex direction="column" gap={4}>
              <Text fontWeight="bold">Examples</Text>
              <Box>
                <Box w="15rem" mb={1}>
                  <LetterGridRow
                    rowGuess="WEARY"
                    solution="WXXXX"
                    isSubmitted={true}
                    initiallyRevealed={true}
                  />
                </Box>
                <Text>
                  The letter W is in the word and in the correct spot.
                </Text>
              </Box>
              <Box>
                <Box w="15rem" mb={1}>
                  <LetterGridRow
                    rowGuess="PILLS"
                    solution="XIXXX"
                    isSubmitted={true}
                    initiallyRevealed={true}
                  />
                </Box>
                <Text>The letter I is in the word but in the wrong spot.</Text>
              </Box>
              <Box>
                <Box w="15rem" mb={1}>
                  <LetterGridRow
                    rowGuess="VAGUE"
                    solution="XXXXX"
                    isSubmitted={true}
                    initiallyRevealed={true}
                  />
                </Box>
                <Text>No letters in the guess are in the word.</Text>
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
