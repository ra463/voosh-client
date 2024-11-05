import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

const App = () => {
  const { token } = useSelector((state) => state.auth);
  let user = false;
  if (token) user = true;

  const GoogleAuthRegisterWrapper = () => {
    return (
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      >
        <Register></Register>
      </GoogleOAuthProvider>
    );
  };

  const GoogleAuthLoginWrapper = () => {
    return (
      <GoogleOAuthProvider
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
      >
        <Login></Login>
      </GoogleOAuthProvider>
    );
  };

  return (
    <Router>
      <Suspense
        fallback={
          <div className="load">
            <PulseLoader size={15} color="#36d7b7" />
          </div>
        }
      >
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <GoogleAuthLoginWrapper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <GoogleAuthRegisterWrapper />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
    </Router>
  );
};

export default App;
