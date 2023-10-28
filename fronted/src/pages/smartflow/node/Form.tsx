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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams, NavLink } from "react-router-dom";

import Api from "../../../services/Api";
import { AxiosPromise } from "axios";
import { useEffect } from "react";
import nodeStore from "@/stores/node";

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
    name: "",
    description: "",
    flowId: flowId,
    action: "",
    actionType: "sql",
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
    }, [nodeId]);
  }

  if (formType == "new") {
    defaultValues.actionType = "sql";
    defaultValues.action = "select * from table";
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

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

  // console.log(watch()); // watch input value by passing the name of it
  console.error("form errors:", errors);
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
          <Tab>Heading</Tab>
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
            </FormControl>
          </TabPanel>
          <TabPanel>
            <FormControl id="description">
              <FormLabel>Description</FormLabel>
              <Textarea
                {...register("description")}
                minHeight={"200"}
                bg="white"
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
