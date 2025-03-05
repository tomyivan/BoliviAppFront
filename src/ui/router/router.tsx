import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { AuthPage,
        ErrorPage
 } from "../pages";
export const router =   createBrowserRouter([
    {
        path: "/login",
        element: <AuthPage />,
        errorElement: <ErrorPage />
    }
],
{
    basename: "/boliviApp/"
}
)