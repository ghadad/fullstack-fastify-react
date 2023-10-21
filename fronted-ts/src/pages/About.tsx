// Code: About page
// create About page take content from free api that retrieve content fot about page

import { useEffect, useState } from 'react';
import { Image, Stack } from '@chakra-ui/react'
import axios from 'axios';


const url = "https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text";

// fetch content from url   
const getContent = async () => {
    const response = await fetch(url);
    const content = await response.text();
    return content;
}

// create About page
export default () => {
    const [content, setContent] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const content = await getContent();
                setContent(content);
            }
            catch (err) {
                setError("error");
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
        return <div>Error: {error}</div>;
    }

    if (content != null)
        return (
            <div className='m-10 border-red-200'>
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
                    <Image
                        boxSize='200px'
                        objectFit='cover'
                        src='https://bit.ly/dan-abramov'
                        alt='Dan Abramov'
                    />
                </Stack>
                <div className='p-11'>{content}</div>
            </div>
        )
    return <div>no data</div>
}
