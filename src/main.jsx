import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Shared/Login.jsx";
import SignUp from "./Shared/SignUp.jsx";
import Home from "./Pages/Home.jsx";
import AddNew from "./Pages/AddNew.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import AllUsers from "./Pages/AllUsers.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/addNew",
        element: <AddNew />,
      },
      {
        path: "adminDashboard",
        element: <AllUsers />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="bg text-white min-h-screen">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
