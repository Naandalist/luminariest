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
    element: <DefaultLayout children={<HomePage />} />,
    errorElement: <ErrorPage />,
    loader: homeLoader,
  },
  {
    path: "/task/:taskId",
    element: <DefaultLayout children={<DetailPage />} />,
    loader: detailLoader,
    errorElement: <ErrorPage />,
  },
  {
    path: "/new-task",
    element: <DefaultLayout children={<AddEditForm />} />,
    errorElement: <ErrorPage />,
    loader: addEditLoader,
  },
  {
    path: "/task/:taskId/edit",
    element: <DefaultLayout children={<AddEditForm />} />,
    loader: addEditLoader,
    errorElement: <ErrorPage />,
  },
]);

export default router;
