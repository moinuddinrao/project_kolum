import React from "react";

import { createBrowserRouter, redirect } from "react-router-dom";

import AuthLayout from "@/components/AuthLayout";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import ResetLink from "@/pages/ResetLink";
import Reset from "@/pages/Reset";
import Layout from "@/components/Layout";
import CompanySetup from "@/pages/CompanySetup";
import Dashboard from "@/pages/Dashboard";
import AllOperators from "@/pages/AllOperators";
import AllImports from "@/pages/AllImports";
import AllReports from "@/pages/AllReports";
import Settings from "@/pages/Settings";

export const ROUTES = {
  signup: "/signup",
  terms: "/terms",
  login: "/login",
  resetLink: "/reset-link",
  reset: "/reset",
  companySetup: "/company-setup",
  dashboard: "/dashboard",
  operators: "/operators",
  addOperator: "/add-operator",
  suppliers: "/suppliers",
  imports: "/imports",
  reports: "/reports",
  settings: "/settings",
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
        element: <AllImports />,
      },
      {
        path: ROUTES.reports,
        element: <AllReports />,
      },
      {
        path: ROUTES.settings,
        element: <Settings />,
      },
    ],
  },
]);

export default Router;
