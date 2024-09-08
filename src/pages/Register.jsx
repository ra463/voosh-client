import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../components/styles/Login.scss";
import PulseLoader from "react-spinners/PulseLoader";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";
import { setToken } from "../features/authSlice";
import Header from "../components/Header/Header";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

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
        const { data } = await axiosInstance.get(
          `/api/user/google-login?code=${response["code"]}`
        );

        if (data.success) {
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
          <span className="head">Welcome! Please enter your details.</span>
          <p className="name">Full Name</p>
          <input
            type="text"
            placeholder="John Doe"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <p className="email">Confirm Password</p>
          <input
            type="text"
            placeholder="Confirm Your Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className="email">Avatar</p>
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

          <Link to="/login" className="signup">
            <span>Go to Login?</span>
          </Link>

          <button disabled={loading} type="submit">
            {loading ? <PulseLoader color="#fff" size={5} /> : "SIGNUP"}
          </button>
          <button className="google" onClick={googleLogin}><FcGoogle /> Login with Google</button>
        </form>
      </div>
    </>
  );
};

export default Register;
