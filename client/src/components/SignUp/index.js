import React, { useState, useEffect } from "react";
import "./index.css";
import Toast from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import logoImage from "../../Assets/img/skygoal.jpeg";

const FETCH_URL = process.env.REACT_APP_FETCH_URL;

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Toast.fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }
    try {
      console.log(formData, "formdata");
      const response = await fetch(`${FETCH_URL}registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const responseData = await response.json();
      console.log(responseData, "data");
      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: responseData.message,
        });
      } else {
        Toast.fire({
          icon: "error",
          title: responseData.message,
        });
      }
    } catch (error) {
      // Handle registration error
      console.error("Registration failed:", error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(formData, "formdata");
      const response = await fetch(`${FETCH_URL}login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      const responseData = await response.json();
      console.log(responseData, "data");
      if (response.ok) {
        Toast.fire({
          icon: "success",
          title: responseData.message,
        });
        Cookies.set("token", responseData.token);
        navigate("/");
      } else {
        Toast.fire({
          icon: "error",
          title: responseData.message,
        });
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.message);
    }
  };
  const onclickforgotpassword = () => {
    navigate("/UserForgotPassword");
  };
  const toggle = () => {
    setIsSignIn((prevState) => !prevState);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div
      id="container"
      className={
        isSignIn ? "signup-container sign-in" : "signup-container sign-up"
      }
    >
      <div className="signup-row">
        <div className="signup-col align-items-center-1 flex-col sign-up">
          <div className="form-wrapper align-items-center-1">
            <div className="form sign-up">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {!isSignIn && (
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}

              <button onClick={isSignIn ? handleLogin : handleRegister}>
                {isSignIn ? "Sign in" : "Sign up"}
              </button>
              <p>
                {isSignIn
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <b onClick={toggle} className="pointer">
                  {isSignIn ? " Signup here" : " Signin here"}
                </b>
              </p>
            </div>
          </div>
        </div>
        <div className="signup-col align-items-center-1 flex-col sign-in">
          <div className="form-wrapper align-items-center-1">
            <div className="form sign-in">
              <div className="input-group">
                <i className="bx bxs-user"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button onClick={handleLogin}>Sign in</button>
              <p>
                <b
                  onClick={onclickforgotpassword}
                  style={{ cursor: "pointer" }}
                >
                  Forgot password?
                </b>
              </p>
              <p>
                <span>Don't have an account?</span>
                <b onClick={toggle} className="pointer">
                  Signup here
                </b>
              </p>
            </div>
          </div>
          <div className="form-wrapper"></div>
        </div>
      </div>
      <div className="signup-row content-row">
        <div className="signup-col align-items-center-1 flex-col">
          <div className="text sign-in signin-logo-name-container">
            <div className="img sign-in signin-logo-image-container">
              <img src={logoImage} alt="" className="signin-logo-image" />
            </div>
          </div>
        </div>
        <div className="signup-col align-items-center-1 flex-col sign-up-right-container">
          <div className="img sign-up signin-logo-image-container">
            <img src={logoImage} alt="" className="signin-logo-image md-ml-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
