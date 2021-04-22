import React from 'react';
import { Box,Button, Paragraph,Avatar} from 'grommet';
import Card from "../components/Card";
import fire from '../fire';




export const Compte= () => {
    const user = fire.auth().currentUser;
    console.log(user);
    
    return(
        <Box align="center">
            <Card           
                align="center"
                justify="center"
                round="medium"
                padding="medium"
                margin="medium"
                width="medium"
                height="xsmall">

                    {user.email}



            </Card>

            

        </Box>
    )

}
export default Compte;