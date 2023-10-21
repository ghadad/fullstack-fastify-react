// use chakra ui to create a profile page from randon user api
import { useEffect, useState } from 'react';
import { Image, Stack } from '@chakra-ui/react'
import axios from 'axios';
interface UserProfileProps {
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    name: {
        first: string;
        last: string;
    },
    email: string;
    phone: string;
}
interface Error {
    message?: string;
}

const UserProfile2 = () => {
    const [user, setUser] = useState<UserProfileProps | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                let userData = await axios.get('https://randomuser.me/api/');
                setUser(userData.data.results[0]);
            }
            catch (err) {
                setError({ message: "error" });
            }
            finally {
                setLoading(false);
            }
        };

        getData();

        return () => {
            console.log("cleanup");
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (user != null)
        return (
            <div>
                <Stack direction='row'>
                    <Image
                        boxSize='100px'
                        objectFit='cover'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Image
                        boxSize='150px'
                        objectFit='cover'
                        src={user.picture.large}
                        alt='Dan Abramov'
                    />
                </Stack>
                <h2>{user.name.first} {user.name.last} </h2>
                <h2>{user.email}</h2>
                <h3>{user.phone}</h3>

            </div>
        );
    else
        return (<div>no user</div>)
};

export default UserProfile2;
