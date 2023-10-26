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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Api from "../../../services/Api";

const Form = () => {
  const { flowId } = useParams<{ flowId: string }>();
  const location = useLocation();

  let defaultValues = location.state?.item || {};
  const type = location.state?.type;
  if (type === "add") {
    defaultValues.flowId = location.state.flowId;
    defaultValues.actionType = "sql";
    defaultValues.action = "select * from table";
  } else if (type === "edit") {
    defaultValues = {
      actionType: "sql",
      action: "select * from table",
      ...location.state.item,
    };
  }

  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const toast = useToast();

  const onSubmit = async (data: any) => {
    clearErrors("apiError");
    try {
      if (type == "add") {
        await Api.post("m/smartflow/node", data);
      } else if (type == "edit") {
        await Api.put(`m/smartflow/node/${data.id}`, data);
      }
      toast({
        title: "Flow updated.",
        description: "Flow updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      location.state.item = data;
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
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="gray.200"
      p="10px"
      border={{ base: "none", lg: "2px solid #ccc" }}
      borderRadius={{ base: "none", lg: "5px" }}
    >
      <Heading as="h2" fontSize="1.5em">
        Flow {getValues("id")} :{getValues("flowId") || flowId}
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
          {type == "edit" ? "Update" : "Create"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Form;
