import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/guest/HomePage";
import DestinationPage from "../pages/guest/DestinationPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/guest/LoginPage";
import Dashboard from "../pages/admin/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>,
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