import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../components/styles/Login.scss";
import PulseLoader from "react-spinners/PulseLoader";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { setToken } from "../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("id", data.user._id);

        dispatch(
          setToken({
            token: data.token,
            email: data.user.email,
            name: data.user.name,
            id: data.user._id,
          })
        );
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <>
      <header>
        <Link to="/">
          <img src="/b-logo.svg" alt="logo" />
        </Link>
      </header>
      <div className="login-div">
        <form className="loginform" onSubmit={loginHandler}>
          <h2>Login</h2>
          <p className="head">Welcome Back! Please enter your details.</p>
          <p className="email">Email</p>
          <input
            type="email"
            placeholder="email@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="email">Password</p>
          <input
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/register" className="signup">
            <span>Create an account?</span>
          </Link>

          <button disabled={loading} type="submit">
            {loading ? <PulseLoader color="#fff" size={5} /> : "SIGNIN"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
