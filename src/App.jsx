import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Homepage from "./pages/Homepage";
import BlogPage from "./pages/BlogPage";
import BlogDetails from "./components/blogs/BlogDetails";
import Errorpage from "./pages/ErrorPage";
import LocationDetails from "./pages/LocationDetails";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CoinCalculator from "./pages/CoinCalculator";
import AllProducts from "./pages/AllProducts";
import TermsAndConditions from "./pages/TermsAndConditions";
import SingleProduct from "./pages/SingleProduct";
import UserProfile from "./pages/UserProfile";
import HostingPage from "./pages/HostingPage";
import CalculatorPage from "./pages/calculator/CalculatorPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import BundleProducts from "./pages/bundles/BundleProducts";
import SingleBundle from "./pages/bundles/SingleBundle";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import EventsPage from "./pages/EventsPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import { ToastContainer } from "react-toastify";

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
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      { path: "/calculator/:coin", element: <CoinCalculator /> },
      { path: "/shop", element: <AllProducts /> },
      { path: "/terms", element: <TermsAndConditions /> },
      { path: "/products/:id", element: <SingleProduct /> },
      { path: "profile", element: <UserProfile /> },
      { path: "hosting", element: <HostingPage /> },
      { path: "calculator", element: <CalculatorPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "/verify-email/:uidb64/:token", element: <VerifyEmailPage /> },
      { path: "auth/reset-password/:uidb64/:token", element: <ResetPasswordPage /> },
      { path: "bundles", element: <BundleProducts /> },
      { path: "bundles/:id", element: <SingleBundle /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "payment-success", element: <PaymentSuccessPage /> },
      { path: "events", element: <EventsPage /> },
      { path: "events/:slug", element: <EventDetailsPage /> },
    ],
  },
]);
export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />

      <RouterProvider router={router} />
    </>
  );
}
