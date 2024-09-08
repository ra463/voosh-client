import React from "react";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { avatar } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);

  const logout = (e) => {
    e.preventDefault();
    dispatch(removeToken());
    localStorage.clear();
    navigate("/login");
    toast.success("Logout Successfully");
  };

  return (
    <div className="header">
      <span>Drag & Drop</span>
      {token ? (
        <div className="me">
          <img src={avatar} alt="avatar" />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </div>
  );
};

export default Header;
