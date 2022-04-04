import { MoonIcon, QuestionOutlineIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { WordleInfoModal } from "./WordleInfoModal";

export function WordleHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const helpLabel = "Help";
  const colorModeLabel = `Switch to ${
    colorMode === "dark" ? "Light" : "Dark"
  } mode.`;

  return (
    <Flex alignItems="center" h="3rem" borderBottomWidth="1px" px={3}>
      <Flex flex={1} align="center">
        <IconButton
          onClick={onOpen}
          aria-label={helpLabel}
          title={helpLabel}
          icon={<QuestionOutlineIcon w={6} h={6} />}
        />
      </Flex>
      <Box>
        <Heading size="lg">React Wordle Clone</Heading>
      </Box>
      <Flex flex={1} justify="end">
        <IconButton
          onClick={toggleColorMode}
          aria-label={colorModeLabel}
          title={colorModeLabel}
          icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
        />
      </Flex>
      <WordleInfoModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
}
