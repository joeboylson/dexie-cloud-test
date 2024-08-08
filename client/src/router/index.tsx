import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import AuthenticatedWrapper from "../components/AuthenticatedWrapper";
import { Routes } from "../enums/routes";

const router = createBrowserRouter([
  {
    path: Routes.LOGIN,
    element: <Login />,
  },
  {
    path: Routes.ROOT,
    /**
     * TODO: add Home Page
     */
    element: <p>Root</p>,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
