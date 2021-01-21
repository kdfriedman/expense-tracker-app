import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardPage from '../components/page-components/dashboard/DashboardPage';
import Header from '../components/Header';
import NotFoundPage from '../components/page-components/404/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path='/' exact component={DashboardPage} />
      <Route path='/dashboard' component={DashboardPage} />
      <Route path='/login' component={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
