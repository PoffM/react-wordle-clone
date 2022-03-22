import { Box, Center, Heading } from "@chakra-ui/react";

export function WordleHeader() {
  return (
    <Box h="3rem" borderBottom="1px solid">
      <Center>
        <Heading>React Wordle Clone</Heading>
      </Center>
    </Box>
  );
}
