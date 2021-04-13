import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DashboardPage from "../components/page-components/dashboard/DashboardPage";
import HomePage from "../components/page-components/home/HomePage";
import ExpenseFeedPage from "../components/page-components/expense-feed/ExpenseFeedPage";
import AboutPage from "../components/page-components/about/AboutPage";
import LoginPage from "../components/page-components/login/LoginPage";

import Header from "../components/Header";
import Footer from "../components/Footer";
import NotFoundPage from "../components/page-components/404/NotFoundPage";

const AppRouter = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/expense-feed" component={ExpenseFeedPage} />
      <Route path="/sign-in" component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default AppRouter;
