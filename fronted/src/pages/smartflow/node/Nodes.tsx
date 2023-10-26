// create flows list using mock data
//
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  ButtonGroup,
  InputGroup,
  Badge,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import {
  EditIcon,
  DeleteIcon,
  ViewIcon,
  AddIcon,
  SmallAddIcon,
} from "@chakra-ui/icons";

import { useState, useEffect, useRef } from "react";
import Api from "../../../services/Api";

interface Props {
  flowId?: number;
}

const Nodes = ({ flowId }: Props) => {
  const [data, setData] = useState<any>([]);

  const getData = async () => {
    const response = await Api.get(`//m/smartflow/node/flow/${flowId}`);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Flex alignItems="flex-end" mb="10px">
        <Heading fontSize={"1em"}>
          Nodes by flow {flowId}{" "}
          <Button ml="10px" colorScheme="facebook" rightIcon={<SmallAddIcon />}>
            <NavLink to="add-node" state={{ type: "add", flowId }}>
              Add Node
            </NavLink>
          </Button>
        </Heading>
      </Flex>
      <Box>
        {data.length === 0 && (
          <Flex justifyContent={"center"}>
            <Text bg="gray.300" border="1px" p="4px" borderRadius={"5px"}>
              No nodes found
            </Text>
          </Flex>
        )}
        {data.map((item: any) => (
          <Flex
            alignItems="center"
            justifyContent="space-between"
            p="5px"
            bg="gray.200"
            borderRadius="5px"
            mb="5px"
            key={item.id}
            fontSize={{ base: "14px" }}
          >
            <Text>
              <Badge colorScheme="messenger" p="5px" m="5px">
                {item.id}
              </Badge>
              {item.name} : {item.title} : {item.description} {item.flowId}
              {item.createdAt} : {item.updatedAt}
            </Text>
            <ButtonGroup>
              <NavLink
                to={"/smartflow/node/edit/" + item.id}
                state={{ type: "edit", item }}
              >
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
export default Nodes;
