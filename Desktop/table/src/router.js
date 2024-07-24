import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import ErrorBoundary from "./featured/ErrorBoundary";
import Layout from "./featured/layout";
import DashBoard from "./pages/dashboard";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/dashboard",
                element: <DashBoard />
            }
        ]
    },
    {
        path: "*",
        element: <ErrorBoundary />
    }
]);
