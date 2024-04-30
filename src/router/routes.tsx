import React, { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));

const routes = [
  {
    path: "/",
    element: <Home />,
    layout: "default",
  },
];

export { routes };
