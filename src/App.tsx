// global imports

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// local imports

import "@/App.css";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ForgetPassword from "@/pages/Auth/ForgetPassword";
import PasswordChange from "@/pages/Auth/PasswordChange";
import OtpVerification from "@/pages/Auth/OtpVerification";
import Landing from "@/pages/Landing";
import axios from "axios";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/shared/ProtectedRoutes/ProtectedRoutes";
import { useAuthStore } from "./store/auth-store";
import Upload from "./pages/Video/Upload";

function App() {
  const userEmail = useAuthStore((state) => state.email);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing></Landing>,
    },
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <Profile></Profile>
        </ProtectedRoute>
      ),
      loader: () => {
        const response = axios.post(`https://authisazure-hzhsgpg8a5dja6gx.uksouth-01.azurewebsites.net/api/v1/user/me`, {
          email: userEmail,
        });
        return response;
      },
    },
    {
      path: "/auth",
      children: [
        {
          path: "recovery-mail-request",
          element: <ForgetPassword></ForgetPassword>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },
        {
          path: "register",
          element: <Register></Register>,
        },
        {
          path: ":id/password-change",
          element: <PasswordChange></PasswordChange>,
        },
        {
          path: ":id/otp-verification",
          element: <OtpVerification></OtpVerification>,
          loader: ({ params }) => {
            const response = axios.get(
              `https://authisazure-hzhsgpg8a5dja6gx.uksouth-01.azurewebsites.net/api/v1/user/${params.id}/me`
            );
            return response;
          },
        },
      ],
    },
    {
      path: "/video/create",
      element: <Upload></Upload>,
      loader: () => {
        const response = axios.post(`https://authisazure-hzhsgpg8a5dja6gx.uksouth-01.azurewebsites.net/api/v1/user/me`, {
          email: userEmail,
        });
        return response;
      },
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
