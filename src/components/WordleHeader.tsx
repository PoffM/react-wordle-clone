import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { WordleInfoModal } from "./WordleInfoModal";

export function WordleHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex alignItems="center" h="3rem" borderBottom="1px" px={3}>
      <Flex flex={1} align="center">
        <IconButton
          onClick={onOpen}
          aria-label="Help"
          icon={<QuestionOutlineIcon w={6} h={6} />}
        />
      </Flex>
      <Box>
        <Heading size="lg">React Wordle Clone</Heading>
      </Box>
      <Box flex={1} />
      <WordleInfoModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
