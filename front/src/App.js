import React from "react";
import { Grommet,Button, Box,  } from "grommet";
import Login from "./features/login/login";
import AppBars from "./features/AppBar";
import { css } from 'styled-components';


import fire from "./fire";




import {MainRoute} from './features/route/mainRoute';

//import fire from "./fire";


const theme = {
  global: {
    colors: {
      brand: '#cc0000',
      dark_green : "#2a4b27",
      back: "#292929",
      card: "#bfdbf7",
      accent: "#994650",
      ok: '#00C781',
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
    control:{
      border:{
        color:'#03740A',
      },
    },
    
    
  },
  button: {

    border: {

      color: '#03740A',
    },
    extend: ({ theme }) => css`
    background-color: #2A4B27;
    color: #ffffff;

    @media screen and (max-width: 768px) {
      
            

  `,
  },
  TextInput : {
    border:{
      color: '#03740A',
    },
  },
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  
  fire.auth().onAuthStateChanged((user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
});
  return (
    <Grommet theme={theme} full>
              {!isLoggedIn
          ? (   
              
              <Login />
            
          ) 
          : (
        <Box>
          <AppBars />
            <Box fill align="center" justify="center" background= "#4E4E4E">
             
              
            </Box>
            </Box>

          )}
      <Box fill align="center" justify="center" background= "#D9D8D8">
        <MainRoute/> 
      </Box>
  
    </Grommet>
  );
}

export default App;
