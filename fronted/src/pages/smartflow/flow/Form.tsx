// create the flow form for creatin and updating flows using the react-hook-form library

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams, useLoaderData, NavLink } from "react-router-dom";
import Crons from "../scheduler/Crons";
import Api from "../../../services/Api";
import Nodes from "../node/Nodes";

export const flowLoader = async (params: { id: string }) => {
  const response = await Api.get("m/smartflow/flow/" + params.id);
  return response.data;
};

const Form = () => {
  let flow: any = {};
  const params = useParams<{ id: string }>();
  if (params.id) {
    flow = useLoaderData();
  } else {
    flow = { name: "", description: "" };
  }

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,

    formState: { errors },
  } = useForm({
    defaultValues: flow,
  });

  const toast = useToast();

  const onSubmit = async (data: any) => {
    clearErrors("apiError");
    try {
      await Api.put("m/smartflow/flow/" + data.id, data);
      toast({
        title: "Flow updated.",
        description: "Flow updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      flow = data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: ("Flow update failed : " + error) as string,
        status: "error",
        //duration: 3000,
        isClosable: true,
      });
    }
  };

  console.log(watch()); // watch input value by passing the name of it
  console.error("form errors:", errors);
  return (
    <Grid templateColumns="repeat(12, 1fr)" bg="gray.50" minHeight={"100vh"}>
      <GridItem as="aside" colSpan={{ base: 12, lg: 5, xl: 5 }}>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          bg="gray.200"
          p="10px"
          border={{ base: "none", lg: "2px solid #ccc" }}
          borderRadius={{ base: "none", lg: "5px" }}
        >
          <Heading as="h2" fontSize="1.1em">
            <NavLink to="/smartflow/flow">
              <Text
                color={"facebook.500"}
                display={"table-cell"}
                textDecoration={"underline"}
              >
                Flows
              </Text>
            </NavLink>{" "}
            | Flow {flow.id} : {flow.name}
          </Heading>
          {errors?.apiError && <span>{JSON.stringify(errors.apiError)}</span>}
          {errors.exampleRequired && <span>This field is required</span>}
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              {...register("name", { required: true })}
              bg="white"
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              {...register("description")}
              minHeight={"200"}
              bg="white"
            ></Textarea>
          </FormControl>
          <Flex align={"center"}>
            <Button m="5px" colorScheme="facebook" type="submit">
              {params.id ? "Update" : "Create"}
            </Button>
          </Flex>
        </Box>
        <Box
          mt={5}
          as="form"
          bg={"facebook.100"}
          p="10px"
          border={{ base: "none", lg: "2px solid #ccc" }}
          borderRadius={{ base: "none", lg: "5px" }}
        >
          <Heading as="h2" fontSize="1.5em">
            <Crons />
          </Heading>
          <Text>sasasas sasasassasasa ssasaas</Text>
        </Box>
      </GridItem>

      <GridItem
        colSpan={{ base: 12, lg: 7, xl: 7 }}
        p="10px"
        ml="10px"
        bg="gray.300"
        border={{ base: "none", lg: "2px solid #ccc" }}
        borderRadius={{ base: "none", lg: "5px" }}
      >
        <Nodes flowId={flow.id} flowName={flow.name} />
      </GridItem>
    </Grid>
  );
};

export default Form;
