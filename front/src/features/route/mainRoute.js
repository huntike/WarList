import React from 'react';
import {LandingPage} from '../LandingPage';
import { Switch, Route } from 'react-router-dom';

export const MainRoute= () => {
    return(
      <Switch>
        <Route exact path="/" component={LandingPage}/>
      </Switch>
    )

}
export default MainRoute;