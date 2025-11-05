import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import DestinationPage from "../pages/DestinationPage";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>,
        errorElement: <ErrorPage></ErrorPage>
    },
    {
        path: "/destination/:slug",
        element:
            <DestinationPage />
    },
    {
        path: "/login",
        element:
            <LoginPage />
    },
    {
        path: "/dashboard",
        element:
            <Dashboard />
    },
])