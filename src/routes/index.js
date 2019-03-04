import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch } from "react-router-dom";

import history from "./history";

import Private from "./private";
// import Admin from "./admin";
import Guest from "./guest";



// import Main from "../views/Main";
import SignIn from "../views/SignIn";
// import Perfil from "../views/Perfil";
import Dashboard from "../views/Dashboard";

const Routes = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Guest path="/signin" component={SignIn} />
      <Private path="/" exact component={Dashboard} />
      {/* <Private path="/perfil" component={Perfil} />
      <Private path="/admin" component={Main} /> */}
    </Switch>
  </ConnectedRouter>
);

export default Routes;
