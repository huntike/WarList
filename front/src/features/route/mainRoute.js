import React from 'react';
import {LandingPage} from '../LandingPage';
import {Compte} from '../Compte';
import { Switch, Route } from 'react-router-dom';

export const MainRoute= () => {
    return(
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/Compte" component={Compte}/>

      </Switch>
    )

}
export default MainRoute;