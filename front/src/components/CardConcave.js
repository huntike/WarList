
import { Box } from "grommet";
import styled from "styled-components";


const CardConcave = styled(Box)`
    background: #292929;
    box-shadow: inset 2px 2px 5px #1b1b1b, 
            inset -2px -2px 5px #373737;
    :hover {
        background: rgb(222,105,7);
        background: linear-gradient(90deg, rgba(201, 152, 245,1) 0%, rgba(165, 85, 237,1) 62%);
        box-shadow: inset 5px 5px 10px #7D4CDB, 
        inset -5px -5px 10px #7D4CDB;
    }
`;

export default CardConcave;