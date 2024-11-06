import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Header from "../components/Header/Header";
import "../components/styles/Login.scss";
import { setToken } from "../features/authSlice";
import axiosInstance from "../utils/axiosUtils";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("file", image);

      const { data } = await axiosInstance.post("/api/user/register", formData);

      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("avatar", data.user.avatar.url);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("id", data.user._id);

        dispatch(
          setToken({
            token: data.token,
            email: data.user.email,
            name: data.user.name,
            avatar: data.user.avatar.url,
            id: data.user._id,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const responseGoogle = async (response) => {
    try {
      if (response["code"]) {
        setGoogleLoading(true);
        const { data } = await axiosInstance.get(
          `/api/user/google-login?code=${response["code"]}`
        );

        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.user.email);
          localStorage.setItem("avatar", data.user.avatar.url);
          localStorage.setItem("name", data.user.name);
          localStorage.setItem("id", data.user._id);

          setGoogleLoading(false);

          dispatch(
            setToken({
              token: data.token,
              email: data.user.email,
              name: data.user.name,
              avatar: data.user.avatar.url,
              id: data.user._id,
            })
          );
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: `auth-code`,
  });

  return token ? (
    <Navigate to="/" />
  ) : (
    <>
      <Header />
      <div className="login-div">
        <form className="loginform" onSubmit={loginHandler}>
          <h2>Register</h2>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            required
            type="file"
            accept="image/*"
            placeholder="Avatar"
            onChange={handleImageChange}
          />
          {image && (
            <div className="img">
              <img src={URL.createObjectURL(image)} alt="blog" />
            </div>
          )}

          <button disabled={loading} type="submit">
            {loading ? <PulseLoader color="#fff" size={5} /> : "Signup"}
          </button>

          <Link to="/login" className="signup">
            Already have an account? <span>Login</span>
          </Link>

          <button className="google" onClick={googleLogin}>
            {googleLoading ? (
              <PulseLoader color="#fff" size={5} />
            ) : (
              "Continue with Google"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
