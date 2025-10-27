import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import DestinationPage from "../pages/DestinationPage";

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
])