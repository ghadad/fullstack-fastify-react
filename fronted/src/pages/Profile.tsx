//user profile tsx page     
import { useEffect, useState } from 'react';
import { Image, Stack } from '@chakra-ui/react'
import axios from 'axios';
interface UserProfileProps {
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    name: string;
    email: string;
    phone: string;
}
interface Error {
    message?: string;
}

const UserProfile = () => {
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
                setError({ message: err as string });
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
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                    <Image boxSize='200px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                </Stack>
                <img className="w-[400px] h-[400px] object-cover" src={user.picture.large} alt="User profile" />
                <div>{user.email}</div>
                <div>{user.phone}</div>


            </div>
        );

    return <div>No user found!</div>;
}

export default UserProfile;