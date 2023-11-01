import React from "react";

import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import ResetLink from "@/pages/ResetLink";
import Reset from "@/pages/Reset";

export const ROUTES = {
  login: "/login",
  signup: "/signup",
  dashboard: "/",
  company: "/company",
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
    element: <Layout />,
    children: [
      {
        path: ROUTES.dashboard,
        element: <Dashboard />,
      },
      {
        path: ROUTES.company,
        element: <Dashboard />,
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
  {
    path: ROUTES.login,
    element: <Login />,
  },
  {
    path: ROUTES.signup,
    element: <Signup />,
  },
  {
    path: ROUTES.reset,
    element: <Reset />,
  },
  {
    path: ROUTES.resetLink,
    element: <ResetLink />,
  },
]);

export default Router;
