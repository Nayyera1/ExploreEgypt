import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DestinationDetailPage from "./components/DestinationDetailPage"; // Import your destination detail page
import { UserProvider } from "./utils/userContext";
import "./index.css"; // Ensure you are importing your CSS file here

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/destination/:id", element: <DestinationDetailPage /> }, // Add your new route here
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
