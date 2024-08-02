import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from './featured/layout';
import DetailPage from './pages/detail';
import HomePage from './pages/home/home';



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/detail",
                element: <DetailPage />
            },
            {
                path: "/home",
                element: <HomePage />
            },
            {
                index: true,
                element: <Navigate to="/home" replace />
            }
        ]
    }
]);

export default router;
