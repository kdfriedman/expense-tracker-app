import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardPage from "../components/page-components/dashboard/DashboardPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFoundPage from "../components/page-components/404/NotFoundPage";

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={DashboardPage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/about" component={DashboardPage} />
      <Route path="/expense-feed" component={DashboardPage} />
      <Route path="/expense-history" component={DashboardPage} />
      <Route path="/sign-in" component={DashboardPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default AppRouter;
