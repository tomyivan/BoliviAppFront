import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { AuthPage,
        ErrorPage,
        HomePage
 } from "../pages";
 import { Layout } from "../Layout/Main.layout";
 const prevAuth = ( urlParams: URLSearchParams ) => {
    const token = urlParams.get('auth')
    if(token === null)
    {
        return false;
    }
    localStorage.setItem('token',token);
    const newUrl = window.location.pathname;
    window.history.replaceState(null, '', newUrl);  
}

const authLoader = async () => {    
    const urlParams = new URLSearchParams(window.location.search);
    prevAuth(urlParams);    
    const token = localStorage.getItem("token");    
    return token === '' || token === null ? redirect('/login') : null;
}
export const router =   createBrowserRouter([
    {
        path: "/login",
        element: <AuthPage />,
        errorElement: <ErrorPage />
    },{
        path: "/inicio",
        element: <Layout />,
        errorElement: <ErrorPage />,
        loader: authLoader,
        children: [
            {
                path: "/inicio",
                element: <HomePage />,
            }
        ]
    }
],
{
    basename: "/boliviApp/"
}
)