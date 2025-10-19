import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import DestinationsPage from "../pages/DestinationsPage";
import ErrorPage from "../pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage></HomePage>,
        errorElement: <ErrorPage></ErrorPage>  
    },
    {
        path: "/destinations",
        element: <DestinationsPage></DestinationsPage>
    }
])