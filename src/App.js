import React, {useState, useEffect} from 'react';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import AuthLayout from "./layouts/Auth/Auth";
import AdminLayout from "./layouts/Admin/Admin";
import RTLLayout from "./layouts/RTL/RTL";
import {createBrowserHistory} from "history";

const hist = createBrowserHistory();

function App(){
  return(
    <Router history={hist}>
      <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/rtl" render={props => <RTLLayout {...props} />} />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </Router>
  )
}
export default App;
