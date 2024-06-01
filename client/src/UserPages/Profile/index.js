import React, { useEffect, useState } from "react";
import "./index.css";
import Toast from "../../utils/Toast";
import { Box, Modal } from "@mui/material";
import UpdatePassword from "../UpdatePassword";
import Spinner from "../../utils/Spinner";
import Cookies from "js-cookie";

const UserProfile = ({ updated }) => {
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, updatedData] = useState({
    email: "",
    name: "",
    mobile_number: "",
  });

  const token = Cookies.get("token");

  const fetchUserData = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}/getUserInfo`,
        options
      );
      const data = await response.json();
      setLoading(false);
      updatedData({
        email: data.user.email,
        name: data.user.name,
        mobile_number: data.user.mobileNumber,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    console.log(formData);
    const options = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FETCH_URL}updateUserDetails`,
        options
      );
      console.log(response, "response");
      if (response.ok === true) {
        const responseData = await response.json();
        Toast.fire({
          icon: "success",
          title: responseData.message,
        });
        fetchUserData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onClickUpdatePassword = () => {
    setUpdatePasswordModal(!updatePasswordModal);
  };
  const handleCloseModal = () => {
    setUpdatePasswordModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    updatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="user-profile-main-container">
      {loading ? (
        <Spinner />
      ) : (
        <div className="user-profile-container">
          <div className="user-profile-details-container">
            <div className="user-profile-inputs-holding-container">
              <div className="user-profile-input-container">
                <label className="app-main-heading">Full Name</label>
                <input
                  type="text"
                  className="add-exam-input-field"
                  value={data.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>
              <div className="user-profile-input-container">
                <label className="app-main-heading">Email</label>
                <input
                  type="text"
                  className="add-exam-input-field"
                  readOnly
                  value={data.email}
                  onChange={handleInputChange}
                  name="Email"
                />
              </div>
              <div className="user-profile-input-container">
                <label className="app-main-heading">Phone Number</label>
                <input
                  type="text"
                  className="add-exam-input-field"
                  value={data.mobile_number}
                  onChange={handleInputChange}
                  name="mobile_number"
                />
              </div>
              <div
                className="user-profile-input-container"
                style={{ marginTop: "20px" }}
              >
                <p
                  onClick={onClickUpdatePassword}
                  className="employee-profile-update-password"
                >
                  Update Password?
                </p>
              </div>
            </div>
            <div>
              <button className="app-main-button mt-3" onClick={handleSubmit}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={updatePasswordModal}
        onClose={handleCloseModal}
        style={{ width: "100%", backgroundColor: "transparent" }}
      >
        <Box
          sx={{
            position: "relative",
            width: "500px",
            alignItems: "flex-start",
            minHeight: "450px",
            overflow: "no-scroll",
            scrollbarWidth: "none",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            borderRadius: "8px",
            p: 2,
          }}
        >
          <UpdatePassword onClose={onClickUpdatePassword} />
        </Box>
      </Modal>
    </div>
  );
};

export default UserProfile;
