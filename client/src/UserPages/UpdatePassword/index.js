import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import Toast from "../../utils/Toast";
import "./index.css";
import Cookies from "js-cookie";

const UpdatePassword = ({ onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleNewPasswordChange1 = (e) => {
    setNewPassword1(e.target.value);
  };
  const updatePassword = async () => {
    if (newPassword !== newPassword1) {
      Toast.fire({
        icon: "error",
        title: "New passwords doesn't match",
      });
      return;
    }

    const token = Cookies.get("token");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}updatePassword`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: oldPassword,
            newPassword,
          }),
        }
      );

      if (response.ok) {
        response.json().then((data) => {
          Toast.fire({
            icon: "success",
            title: data.message,
          });
        });
        onClose();
      } else {
        response.json().then((data) => {
          Toast.fire({
            icon: "error",
            title: data.message,
          });
        });
      }
    } catch (error) {
      Toast.fire({
        icon: "success",
        title: error.message,
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10px",
        }}
      >
        <ImCancelCircle
          onClick={onClose}
          style={{
            fontSize: "24px",
            color: "#316795",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        />
      </div>
      <div className="update-password-form-main-container">
        <h2 className="update-password-heading">Password Update</h2>
        <form className="update-password-form-continer">
          <div className="update-password-input-container">
            <label htmlFor="oldPassword" className="update-password-label">
              Old Password:
            </label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={handleOldPasswordChange}
              required
              placeholder="Enter your old password"
              className="update-password-input"
            />
          </div>
          <div className="update-password-input-container">
            <label htmlFor="newPassword" className="update-password-label">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              required
              placeholder="Enter your new password"
              className="update-password-input"
            />
          </div>
          <div className="update-password-input-container">
            <label htmlFor="newPassword" className="update-password-label">
              Confirm New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Confirm your new password"
              value={newPassword1}
              onChange={handleNewPasswordChange1}
              required
              className="update-password-input"
            />
          </div>
          <div className="update-password-button-container">
            <button
              type="button"
              className="app-main-button w-100"
              onClick={updatePassword}
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePassword;
