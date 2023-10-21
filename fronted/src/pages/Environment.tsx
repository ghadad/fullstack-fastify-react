import { Outlet } from "react-router-dom";

import { Heading } from "@chakra-ui/react";

export default function Environment() {
    return (
        <div>
            <Heading color="blue.400" p={'"100px"'} >Environment parent</Heading>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique optio voluptas deserunt. Quibusdam velit voluptates alias! Necessitatibus, excepturi temporibus, vitae eos obcaecati quo hic dolore accusantium iusto rem incidunt doloribus.
            </div>
            <Outlet />
        </div>
    )
}

