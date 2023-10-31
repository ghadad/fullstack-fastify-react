// create flows list using mock data
//
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Badge,
  Select,
  Icon,
  FormControl,
  useToast,
} from "@chakra-ui/react";

import {
  VscRunBelow,
  VscRunAbove,
  VscChevronUp,
  VscChevronDown,
} from "react-icons/vsc";

import { EditIcon, DeleteIcon, ViewIcon, SmallAddIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";
import Api from "../../../services/Api";
import NodeForm from "./Form";
import nodeStore from "@/stores/node.ts";
import Alert from "./alert";

interface Props {
  flowId?: number;
  flowName?: string;
}

const Nodes = ({ flowId }: Props) => {
  const [data, setData] = useState<any>([]);
  const [activeNode, setActiveNode] = useState<any>();
  const toast = useToast();
  const modifiedNode = nodeStore((state) => state.modifiedNode);

  const subscribe = () => {
    nodeStore.subscribe((modifiedNode: any) => {
      console.log("modifiedNode", modifiedNode);
      setActiveNode(modifiedNode);
    });
  };

  const getData = async () => {
    const response = await Api.get(`//m/smartflow/node/flow/${flowId}`);
    setData(response.data);
  };

  useEffect(() => {
    getData();
    subscribe();
  }, []);

  useEffect(() => {
    if (activeNode) {
      if (activeNode.isNewItem) {
        delete activeNode.isNewItem;
        setData([...data, activeNode]);
      } else if (activeNode.isDeleted) {
      } else if (activeNode.isUpdated) {
        delete activeNode.isUpdated;
        setData(
          data.map((x: any) => {
            if (x.id === activeNode.id) {
              x = activeNode;
            }
            return x;
          })
        );
      }
    }
  }, [activeNode]);

  const deleteNode = async (nodeId: number) => {
    const response = await Api.delete(`//m/smartflow/node/${nodeId}`);

    if (response.status === 200) {
      toast({
        title: `Node ${nodeId} deleted successfully`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setData(
        data.filter((item: any) => {
          return item.id !== nodeId;
        })
      );
    }
  };

  const addNode = (
    type: "node" | "reducer" | "splitter" | "grouper" | "lambda"
  ) => {
    const newNode = {
      id: 0,
      type: type,
      name: "",
      description: "",
      flowId: flowId,
      action: "",
      position: data.length + 1,
      actionType: "sql",
      show: true,
    };
    setActiveNode(newNode);
  };

  return (
    <Box>
      <Flex alignItems="flex-end" mb="10px">
        <Heading as="h2" fontSize={"1em"}>
          Nodes by flow {flowId} Modified node : {modifiedNode.name}
          <Button
            ml="10px"
            colorScheme="facebook"
            rightIcon={<SmallAddIcon />}
            onClick={() => addNode("node")}
          >
            Add Node
          </Button>{" "}
          <Button
            ml="10px"
            colorScheme="twitter"
            rightIcon={<SmallAddIcon />}
            onClick={() => addNode("grouper")}
          >
            Add Layer
          </Button>{" "}
          After node number{" "}
          <FormControl
            id="afterNodeNumber"
            width="100px"
            display={"inline-flex"}
          >
            <Select>
              {data.map((item: any) => (
                <option value={item.id}>{item.id}</option>
              ))}
            </Select>
          </FormControl>
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
        {activeNode && activeNode.show && (
          <NodeForm flowId={flowId} nodeData={activeNode} />
        )}
        {data.map((item: any) => (
          <>
            {item.show && (
              <NodeForm flowId={flowId} nodeId={item.id} nodeData={item} />
            )}
            {!item.show && (
              <Flex
                alignItems="center"
                justifyContent="space-between"
                p="5px"
                bg={item.type == "node" ? "gray.100" : "facebook.400"}
                textColor={item.type == "node" ? "black" : "white"}
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
                <Box>
                  <EditIcon
                    cursor={"pointer"}
                    color={"facebook.600"}
                    onClick={() => {
                      setData(
                        data.map((x: any) => {
                          if (x.id === item.id) {
                            x.show = true;
                          } else {
                            x.show = false;
                          }
                          return x;
                        })
                      );
                    }}
                  />
                  <ViewIcon color={"facebook.600"} ml="10px" />
                  <Alert
                    text="Delete"
                    colorScheme="red"
                    confirmFunction={() => {
                      deleteNode(item.id);
                    }}
                    opener={<DeleteIcon cursor={"pointer"} color={"red.600"} />}
                  />
                  <Icon as={VscChevronDown} ml="10px" />
                  <Icon as={VscChevronUp} ml="10px" />
                  <Icon as={VscRunAbove} ml="10px" />
                  <Icon as={VscRunBelow} ml="10px" />
                </Box>
              </Flex>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};
export default Nodes;
