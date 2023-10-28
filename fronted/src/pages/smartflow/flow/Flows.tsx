// create flows list using mock data
//
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  Badge,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import {
  SearchIcon,
  EditIcon,
  DeleteIcon,
  ViewIcon,
  AddIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";

import { useState, useEffect, useRef } from "react";
import Api from "../../../services/Api";

const Flows = () => {
  const [data, setData] = useState<any>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmit] = useState(0);

  const getData = async () => {
    const response = await Api.get(
      "m/smartflow/flow/?term=" + searchInputRef.current!.value
    );

    setData(response.data);
  };

  useEffect(() => {
    console.log("submitted", submitted);
    getData();
  }, [submitted]);

  return (
    <Box>
      <Flex alignItems="center" mb="10px">
        <Heading as="h2" fontSize="1.5em">
          Flows
        </Heading>
        <InputGroup marginLeft={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Search"
            width={300}
            ref={searchInputRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSubmit(submitted + 1);
              }
            }}
          />
          <Button
            ml="10px"
            colorScheme="purple"
            onClick={() => {
              setSubmit(submitted + 1);
            }}
          >
            Search
          </Button>
          <Button ml="10px" colorScheme="facebook" rightIcon={<AddIcon />}>
            <NavLink to="create">Create Flow</NavLink>
          </Button>
        </InputGroup>
      </Flex>
      <Box>
        {data.map((item: any) => (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            p="5px"
            bg="gray.200"
            borderRadius="5px"
            mb="5px"
            key={item.id}
          >
            <Text>
              <NavLink to={"edit/" + item.id}>
                <Badge colorScheme="messenger" p="5px" m="5px">
                  {item.id}
                </Badge>
                {item.name}
              </NavLink>
            </Text>
            <ButtonGroup>
              <NavLink to={"edit/" + item.id}>
                <EditIcon />
              </NavLink>

              <NavLink
                to={"explore/" + item.id}
                state={{ item }}
                title="Explore flow"
              >
                <ViewIcon color={"facebook.600"} />
              </NavLink>

              <NavLink
                to={"delete/" + item.id}
                state={{ item }}
                title="Delete flow"
              >
                <DeleteIcon color={"red.600"} />
              </NavLink>
            </ButtonGroup>
          </Flex>
        ))}
      </Box>
    </Box>
  );
};
export default Flows;
