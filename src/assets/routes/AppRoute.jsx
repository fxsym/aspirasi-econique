import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/guest/HomePage";
import DestinationPage from "../pages/guest/DestinationPage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/guest/LoginPage";
import Dashboard from "../pages/admin/Dashboard";
import Destinations from "../pages/admin/Destinations";
import EditDestination from "../pages/admin/EditDestination";
import AddDestination from "../pages/admin/AddDestination";

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
        path: "/admin/dashboard",
        element:
            <Dashboard />
    },
    {
        path: "/admin/destinations",
        element:
            <Destinations />
    },
    {
        path: "/admin/destination/:slug",
        element:
            <EditDestination />
    },
    {
        path: "/admin/destinations/create",
        element:
            <AddDestination />
    },
])