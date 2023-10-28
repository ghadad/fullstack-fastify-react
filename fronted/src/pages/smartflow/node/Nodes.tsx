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
  const [newNode, setNewNode] = useState<any>();
  const toast = useToast();
  const modifiedNode = nodeStore((state) => state.modifiedNode);
  const getData = async () => {
    const response = await Api.get(`//m/smartflow/node/flow/${flowId}`);
    setData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

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

  useEffect(() => {
    nodeStore.subscribe((modifiedNode: any) => {
      console.log("modifiedNode", modifiedNode);
      if (modifiedNode.isNewItem) {
        setData([...data, modifiedNode]);
        setNewNode({ ...modifiedNode });
        return;
      } else if (modifiedNode.isDeleted) {
        console.log("deleted item");
      } else if (modifiedNode.isUpdated) {
        setData(
          data.map((x: any) => {
            if (x.id === modifiedNode.id) {
              Object.assign(x, modifiedNode);
            }
            return x;
          })
        );
      }
    });
  }, []);

  const addNode = () => {
    const newNode = {
      id: 0,
      name: "",
      description: "",
      flowId: flowId,
      action: "",
      position: data.length + 1,
      actionType: "sql",
      show: true,
    };
    setNewNode(newNode);
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
            onClick={() => addNode()}
          >
            Add Node
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
        {newNode && newNode.show && (
          <NodeForm flowId={flowId} nodeData={newNode} />
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
