import React from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthForm from "../components/SignUp";
import NotFound from "../components/NotFound";
import UserProfile from "../UserPages/Profile";
import ProtectedRoute from "../protectedRoute";
const router = createBrowserRouter([
  {
    path: "/signin",
    element: <AuthForm />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  // Add other routes here as needed
]);

export default router;
