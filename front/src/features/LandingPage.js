import React from 'react';
import { Box,Button, Paragraph,Avatar} from 'grommet';
import Login from "./login/login";


import fire from "../fire";




export const LandingPage= () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
    fire.auth().onAuthStateChanged((user) => {
      return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });
    
    return(
        <Box>
        {!isLoggedIn
          ? (   
              
              <Login />
            
          ) 
          : (
            <Box fill align="center" justify="center" background="back">
             
              <Button label="sign out" onClick={()=> fire.auth().signOut()} />
            </Box>
          )}
        </Box>
    )

}
export default LandingPage;