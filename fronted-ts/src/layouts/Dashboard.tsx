import { EditIcon, ViewIcon } from "@chakra-ui/icons"
import {
    Box,
    SimpleGrid,
    Text,
    Flex,
    Heading,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    HStack,
    Divider,
    Button
} from "@chakra-ui/react"

import Api from "../services/Api";
import { useLoaderData } from "react-router-dom"

export default function Dashboard() {

    throw new Error("This is an error");
    const tasks = useLoaderData();
    return (
        <SimpleGrid spacing={10} minChildWidth={300}>
            <h1>Dashboard</h1>
            {tasks && tasks.map(task => (
                <Card key={task.id} borderTop="8px" borderColor="purple.400" bg="white">

                    <CardHeader color="gray.700">
                        <Flex gap={5}>
                            <Box w="50px" h="50px">
                                <Text>AV</Text>
                            </Box>
                            <Box>
                                <Heading as="h3" size="sm">{task.title}</Heading>
                                <Text>by {task.author}</Text>
                            </Box>
                        </Flex>
                    </CardHeader>

                    <CardBody color="gray.500">
                        <Text>{task.description}</Text>
                    </CardBody>

                    <Divider borderColor="gray.200" />

                    <CardFooter>
                        <HStack>
                            <Button variant="ghost" leftIcon={<ViewIcon />}>Watch</Button>
                            <Button variant="ghost" leftIcon={<EditIcon />}>Comment</Button>
                        </HStack>
                    </CardFooter>

                </Card>
            ))}
        </SimpleGrid>
    )
}

export const tasksLoader = async () => {
    const res = await Api.get('module/user/users')
    return res.data;
}