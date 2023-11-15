import React from "react";

import { createBrowserRouter, redirect } from "react-router-dom";

import Layout from "@/components/Layout";
import AuthLayout from "@/components/AuthLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import CompanySetup from "@/pages/CompanySetup";
import Dashboard from "@/pages/Dashboard";
import AllOperators from "@/pages/AllOperators";
import ResetLink from "@/pages/ResetLink";
import Reset from "@/pages/Reset";

export const ROUTES = {
  login: "/login",
  signup: "/signup",
  terms: "/terms",
  companySetup: "/conpany-setup",
  dashboard: "/dashboard",
  operators: "/operators",
  addOperator: "/add-operator",
  suppliers: "/suppliers",
  imports: "/imports",
  reports: "/reports",
  settings: "/settings",
  reset: "/reset",
  resetLink: "/reset-link",
};

const Router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, loader: () => redirect("/login") },
      {
        path: ROUTES.login,
        element: <Login />,
      },
      {
        path: ROUTES.signup,
        element: <Signup />,
      },
      {
        path: ROUTES.resetLink,
        element: <ResetLink />,
      },
      {
        path: ROUTES.reset,
        element: <Reset />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: ROUTES.companySetup,
        element: <CompanySetup />,
      },
      {
        path: ROUTES.dashboard,
        element: <Dashboard />,
      },
      {
        path: ROUTES.operators,
        element: <AllOperators />,
      },
      {
        path: ROUTES.suppliers,
        element: <Dashboard />,
      },
      {
        path: ROUTES.imports,
        element: <Dashboard />,
      },
      {
        path: ROUTES.reports,
        element: <Dashboard />,
      },
      {
        path: ROUTES.settings,
        element: <Dashboard />,
      },
    ],
  },
]);

export default Router;
