import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Homepage from "./pages/Homepage";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./components/blogs/BlogDetails";
import Errorpage from "./pages/ErrorPage";
import LocationDetails from "./pages/LocationDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "blogs",
        element: <BlogPage />,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "locations/:id",
        element: <LocationDetails />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
