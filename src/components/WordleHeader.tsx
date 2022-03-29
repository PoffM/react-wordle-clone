import { Box, Flex, Heading } from "@chakra-ui/react";

export function WordleHeader() {
  return (
    <Flex alignItems="center" h="3rem" borderBottom="1px">
      <Box mx="auto">
        <Heading size="lg">React Wordle Clone</Heading>
      </Box>
    </Flex>
  );
}
