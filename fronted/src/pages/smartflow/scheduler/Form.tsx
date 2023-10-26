// create Scheduler Form using react-hook-form

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const Form = () => {
  // create Schedular aka cron form using react-hook-form
  return (
    <Box as="form">
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="description">
        <FormLabel>Description</FormLabel>
        <Textarea />
      </FormControl>
      <Button type="submit">Submit</Button>
    </Box>
  );
};

export default Form;
