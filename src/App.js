import React from 'react';
import {Redirect, Route, Router, Switch} from "react-router-dom";
import AuthLayout from "./layouts/Auth/Auth";
import AdminLayout from "./layouts/Admin/Admin";
import RTLLayout from "./layouts/RTL/RTL";
import {createBrowserHistory} from "history";

const hist = createBrowserHistory();

function App(){
  const isLoggedIn = localStorage.getItem("token")

  return(
    <Router history={hist}>
      <Switch>
        <Route path="/auth/login" exact render={props => <AuthLayout {...props} />} />
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route path="/admin/dashboard" exact render={props => <AdminLayout {...props} />} />
        <Route path="/admin/userReports" exact render={props => <AdminLayout {...props} />} />
        <Route path="/admin/regionReports" exact render={props => <AdminLayout {...props} />} />
        <Route path="/admin/users" exact render={props => <AdminLayout {...props} />} />
        <Route path="/admin/create" exact render={props => <AdminLayout {...props} />} />
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/rtl" render={props => <RTLLayout {...props} />} />
        <Redirect from="/" to={isLoggedIn ? "/admin/dashboard" : "/auth/login"} />
      </Switch>
    </Router>
  )
}
export default App;
