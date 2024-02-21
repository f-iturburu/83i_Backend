import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { routes } from "./routes/routes.js";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import { Error404 } from "./components/Error404.jsx";
import { ProtectedAdminRoute } from "./routes/protectedAdminRoutes.jsx";
import { Admin } from "./views/Admin.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {routes.map(({ Element, path }) => (
        <Route key={path} path={path} element={<Element />} />
      ))}
      <Route path="*" element={<Error404 />} />
      <Route
        path={"/admin"}
        element={
          <ProtectedAdminRoute>
            <Admin />
          </ProtectedAdminRoute>
        }
      />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
