import React from "react";
import { css } from 'styled-components';
import { Box, Button, Header,ResponsiveContext,Menu, Grommet } from 'grommet'
import {Link} from 'react-router-dom';
import { Menu as MenuIcon } from 'grommet-icons';
import fire from "../fire";



const AppBar = (props) => (
    <Box
      flex align='center'
      tag='header'
      direction='row'
      align='center'
      justify='between'
      background='brand'
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation='medium'
      style={{ zIndex: '1' }}
      
      {...props}
    />
  );




export const AppBars = () => {

    

    return(
      
        <Box >
            <AppBar  background= "#4E4E4E">
                <Link to="/"><Button  label="Home"/></Link>  
                <Box   justify="center" direction="row" gap="medium"> 
                                Liste Warhammer 40K
                          </Box>               
                <Header >
                  <ResponsiveContext.Consumer>
                    {size =>
                      size === 'small' ? (
                        <Box justify="end" >
                          <Menu
                            color="dark-5"
                            a11yTitle="Navigation Menu"
                            dropProps={{ align: { top: 'bottom', right: 'right' } }}
                            icon={<MenuIcon color="#ffffff"/>}
                            items={[
                              {
                                label:  <Link to="/Compte"><Button  label="Compte"/></Link>,
                              },
                              {
                                
                                label: <Button  label="sign out" onClick={()=> fire.auth().signOut()} />,
                              },
                            
                            ]}
                          />
                        </Box>
                      ) : (
                        
                         
                          <Box justify="end" direction="row" gap="medium">
                                  
                                  <Link to="/Compte"><Button  label="Compte"/></Link>
                                  <Button label="sign out" onClick={()=> fire.auth().signOut()} />
                          </Box>
                        
                      )
                    }
                  </ResponsiveContext.Consumer>              
                </Header>
            </AppBar>
          </Box>
        
    
    );
}

export default AppBars;