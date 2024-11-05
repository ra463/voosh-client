import React from "react";
import "./Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../features/authSlice";
import { toast } from "react-hot-toast";
import { GrScorecard } from "react-icons/gr";

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
      <GrScorecard color="#fff" size={27} />
      {token ? (
        <div className="me">
          <img src={avatar} alt="avatar" />
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div className="btns">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Signup</button>
        </div>
      )}
    </div>
  );
};

export default Header;
