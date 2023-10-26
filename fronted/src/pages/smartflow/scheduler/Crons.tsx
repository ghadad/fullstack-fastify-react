// create flows list using mock data
//
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  ButtonGroup,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Crons = () => (
  <Box>
    <Flex alignItems="center" mb="10px">
      <Heading as="h2" fontSize="1.5em">
        Crons
      </Heading>
      <Button ml="10px" colorScheme="purple">
        <NavLink to="create">Create Node</NavLink>
      </Button>
    </Flex>
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p="10px"
        bg="gray.200"
        borderRadius="5px"
        mb="10px"
      >
        <Text>Cron 1</Text>
        <Button colorScheme="purple">Edit</Button>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p="10px"
        bg="gray.200"
        borderRadius="5px"
        mb="10px"
      >
        <Text>Cron 2</Text>
        <Button colorScheme="purple">Edit</Button>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        p="10px"
        bg="gray.200"
        borderRadius="5px"
        mb="10px"
      >
        <Text>Cron 3</Text>
        <ButtonGroup>
          <Button colorScheme="purple" right={"0.5"}>
            <NavLink to={"edit/3"}>Edit</NavLink>
          </Button>
          <Button colorScheme="purple" right={"1.5"}>
            Explore
          </Button>
          <Button colorScheme="purple" right={"1.5"}>
            Delete
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  </Box>
);
export default Crons;
