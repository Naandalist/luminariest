import React from "react";
import ReactDOM from "react-dom/client";

// Perfect Scrollbar
import "react-perfect-scrollbar/dist/css/styles.css";

// Tailwind css
import "./tailwind.css";

import { RouterProvider } from "react-router-dom";
import router from "./router/index";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>
);
