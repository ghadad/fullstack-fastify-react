import { Button, Stack, Input } from '@chakra-ui/react'
import Api from '../services/Api';

import useUserDataStore from '../stores/user';
export default () => {
    const setUserDate = useUserDataStore((state) => state.setUserDate);

    const setUser = async () => {
        await Api.post('login', { username: "golanh", password: "glida" });
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
            <Button onClick={setUser}>Login</Button>
        </Stack>
    );
}