import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage, { loader as homeLoader } from "../pages/home-page";
import DetailPage, { loader as detailLoader } from "../pages/detail-page";
import DefaultLayout from "../layout/default";
import ErrorPage from "../pages/error-page";
import AddEditForm, { loader as addEditLoader } from "../pages/add-edit-form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: homeLoader,
      },
      {
        path: "/task/:taskId",
        element: <DetailPage />,
        loader: detailLoader,
      },
      {
        path: "/new-task",
        element: <AddEditForm />,
        loader: addEditLoader,
      },
      {
        path: "/task/:taskId/edit",
        element: <AddEditForm />,
        loader: addEditLoader,
      },
    ],
  },
]);

export default router;
