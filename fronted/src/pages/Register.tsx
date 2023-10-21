import { Button, Input, Stack } from '@chakra-ui/react'
import useUserDataStore from '../stores/user';
export default () => {
    const setUserDate = useUserDataStore((state) => state.setUserDate);

    const setUser = () => {
        setUserDate({ username: "golanh", connected: true });
    }

    return (
        <Stack spacing={1.5} sx={{ maxWidth: 300, minWidth: 300 }}>
            <Input
                placeholder="Enter username"
                type="string"
            />
            <Input
                placeholder="Enter Password"
                type="password"
            />
            <Input
                placeholder="Rtype Password"
                type="password"
            />
            <Button onClick={setUser} >Register</Button>
        </Stack>
    );
}