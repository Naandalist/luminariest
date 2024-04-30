import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/index";
import NotFoundPage from "../pages/NotFound";
import { routes } from "./routes";

const finalRoutes = [
  ...routes.map((route) => {
    return {
      ...route,
      element: <Layout>{route.element}</Layout>,
    };
  }),
  { path: "*", element: <NotFoundPage /> },
];

const router = createBrowserRouter(finalRoutes);

export default router;
