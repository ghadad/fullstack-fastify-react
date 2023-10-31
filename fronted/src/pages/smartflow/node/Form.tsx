// create the flow form for creatin and updating flows using the react-hook-form library

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
  Code,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams, NavLink } from "react-router-dom";
import actions from "./actions/actions.json";
import Api from "../../../services/Api";
import { AxiosPromise } from "axios";
import { useEffect } from "react";
import nodeStore from "@/stores/node";
const extraParameters = (text: string, type?: "sql" | "tpl") => {
  if (type == "sql")
    return [...new Set<string>(text.match(/{(.*?)}|\:(\w+)/g))].toString();
  else return [...new Set<string>(text.match(/{(.*?)}/g))].toString();
};
export const nodeLoader = async (
  id: string | number
): Promise<AxiosPromise> => {
  const response = await Api.get(`m/smartflow/node/${id}`);
  return response.data;
};

const Form = (props: {
  flowId?: number | string;
  nodeId?: number | string;
  nodeData?: any;
}) => {
  const urlParams = useParams<{ nodeId?: string; flowId?: string }>();

  const flowId = props.flowId || urlParams.flowId;
  const nodeId = props.nodeId || urlParams.nodeId;
  const formType = nodeId ? "edit" : "new";
  let defaultValues = {
    type: "node",
    name: "",
    description: "",
    flowId: flowId,
    action: "",
    actionType: "",
    columns: "",
    inputSchema: "",
    outputSchema: "",
  };
  if (props.nodeData) {
    defaultValues = props.nodeData;
  } else {
    useEffect(() => {
      const fetchData = async (nodeId: string | number) => {
        const data = await nodeLoader(nodeId);
        defaultValues = data.data;
      };
      if (nodeId) fetchData(nodeId);
      return () => {};
    }, [nodeId]);
  }

  if (formType == "new") {
    console.log("new node");
  }

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      console.log("WATCH form data :", value);
      console.log("WATCH NAME:", name);
      console.log("WATCH TYPE:", type);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const toast = useToast();
  const setNode = nodeStore((state) => state.setNode);

  const onSubmit = async (data: any) => {
    let result = null;
    let newNode;
    try {
      if (formType == "new") {
        result = await Api.post("m/smartflow/node", data);
        newNode = { ...result.data, isNewItem: true, show: false };
      } else {
        result = await Api.put(`m/smartflow/node/${data.id}`, data);
        newNode = { ...result.data, isUpdated: true, show: false };
      }

      console.log("newNode", newNode);
      setNode(newNode);
      toast({
        title: "Node updated.",
        description: "Node updated successfully",
        status: "success",
        duration: 1500,
        isClosable: true,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: ("Node update failed : " + error) as string,
        status: "error",
        //duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="gray.200"
      p="10px"
      border={{ base: "none", lg: "2px solid #ccc" }}
      borderRadius={{ base: "none", lg: "5px" }}
    >
      <Heading as="h2" fontSize={"1em"}>
        {flowId && (
          <>
            <NavLink to={`/smartflow/flow/edit/${flowId}`}>
              Flow : {flowId}{" "}
            </NavLink>{" "}
            {`>>`}
          </>
        )}
        Node {nodeId}
      </Heading>
      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Action</Tab>
          <Tab>Columns</Tab>
          <Tab>Input Schema</Tab>
          <Tab>Output Schema</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                {...register("name", { required: true })}
                bg="white"
              />
              <Text as="pre">
                Parameters : [{extraParameters(watch("name"))}]
              </Text>
            </FormControl>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description")}
                minHeight={"200"}
                bg="white"
              ></Textarea>
            </FormControl>
            <Text as="pre">
              Parameters : [{extraParameters(watch("description"))}]
            </Text>
          </TabPanel>
          <TabPanel>
            <FormControl id="action">
              <FormLabel>Type</FormLabel>
              <Select {...register("actionType")}>
                {Object.keys(actions).map((item: any) => (
                  <option value={item}>{item}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="description">
              <FormLabel>Action</FormLabel>
              <Textarea
                {...register("action")}
                minHeight={"200"}
                bg="white"
              ></Textarea>
              <Text as="pre">
                Parameters : [{extraParameters(watch("action"), "sql")}]
              </Text>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <FormControl id="columns">
              <FormLabel>Columns</FormLabel>
              <Textarea
                minHeight={"200"}
                bg="white"
                {...register("columns")}
              ></Textarea>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <FormControl id="input-schema">
              <FormLabel>Input Schema</FormLabel>
              <Textarea
                minHeight={"200"}
                bg="white"
                {...register("inputSchema")}
              ></Textarea>
            </FormControl>
          </TabPanel>
          <TabPanel>
            <FormControl id="output-schema">
              <FormLabel>Output Schema</FormLabel>
              <Textarea
                minHeight={"200"}
                bg="white"
                {...register("outputSchema")}
              ></Textarea>
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex align={"center"}>
        <Button m="5px" colorScheme="facebook" type="submit">
          {formType == "edit" ? "Update" : "Create"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Form;
