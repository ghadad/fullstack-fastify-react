// create the flow form for creatin and updating flows using the react-hook-form library

import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

export default function Form() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data: any) => console.log(data);
    console.log(watch("example")); // watch input value by passing the name of it
    
    return (
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            {errors.exampleRequired && <span>This field is required</span>}
        <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" {...register("name", { required: true })} />
        </FormControl>
        <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea {...register("description")} />
        </FormControl>
        <Button type="submit">Submit</Button>
        </Box>
    );
    }