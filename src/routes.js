import React from 'react';
import { Switch } from 'react-router-dom';
import Layout from "~/components/Layout";

import PrivateRoute from "~/components/authRoutes/PrivateRoute";
import PublicRoute from "~/components/authRoutes/PublicRoute";

import Home from './pages/home';
import SignIn from './pages/home/signin';

import Dashboard from './pages/admin/dashboard';
import AdminMatches from './pages/admin/matches';
import AddEditMatches from './pages/admin/matches/addEditMatches';

const Routes = props => (
  <Layout>
    <Switch>
      <PrivateRoute {...props} path="/dashboard" component={Dashboard} />
      <PrivateRoute {...props} path="/admin_matches/edit_match/:id" component={AddEditMatches} />
      <PrivateRoute {...props} path="/admin_matches/edit_match" component={AddEditMatches} />
      <PrivateRoute {...props} path="/admin_matches" component={AdminMatches} />

      <PublicRoute {...props} restricted path="/sign_in" component={SignIn} />
      <PublicRoute {...props} exact path="/" component={Home} />
    </Switch>
  </Layout>
)

export default Routes;
