// create table component using Chakra UI with mock data
import { useEffect, useState } from 'react';
import { Image, Stack, Table, Thead, Tbody, Tr, Th, Td, TableCaption } from '@chakra-ui/react'

const data = [
    { name: "golang", age: 10 },
    { name: "java", age: 20 },
    { name: "python", age: 30 },
    { name: "c++", age: 40 },
    { name: "c#", age: 50 },
    { name: "javascript", age: 60 },
    { name: "typescript", age: 70 },
];

export default () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                setUsers(data);
            }
            catch (err) {
                setError(err);
            }
            finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (data != null)
        return (
            <div>
                <Table variant="simple">
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>name</Th>
                            <Th>age</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((user, index) => (
                            <Tr key={index}>
                                <Td>{user.name}</Td>
                                <Td>{user.age}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </div>
        )
    return <div>no data</div>
}


