import { createBrowserRouter } from "react-router-dom";
import Layout from "../component/Layout/Layout";
import Home from "../pages/Home/Home";
import PostDetails from "../pages/PostDetails/PostDetails";

export const router = createBrowserRouter([
    {
        path: '/', element: <Layout />, children: [
            { path: '/', element: <Home /> },
            {
                path: '/post/:id', element: <PostDetails />
            },

        ]
    }

])