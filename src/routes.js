import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from "~/components/Layout";
import Home from './pages/home';
import SignIn from './pages/home/signin';
import Dashboard from './pages/admin/dashboard';

const Routes = () => (
  <Layout>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/sign_in" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} />
    </Switch>
  </Layout>
)

export default Routes;
