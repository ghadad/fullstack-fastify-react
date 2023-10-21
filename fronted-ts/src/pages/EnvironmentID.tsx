// fetach the environment id from the url params  
import { useParams } from 'react-router-dom';

export default function EnvironmentID() {
    const { id } = useParams<{ id: string }>();
    return (
        <div>
            <h1>sub environment  ID : {id}</h1>
            <div>

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique optio voluptas deserunt. Quibusdam velit voluptates alias! Necessitatibus, excepturi temporibus, vitae eos obcaecati quo hic dolore accusantium iusto rem incidunt doloribus.
            </div>
            <div>
                {id}
            </div>
        </div>
    )
}


