import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import "./EditAccount.css";

const EditAccountCMC = (props) => {
  // Retrieve userData from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  // Convert userData object to array of entries
  const userDataArray = userData ? Object.entries(userData) : [];
  // Get user name from userDataArray by index, or fallback to an empty string
  const cmcName = userDataArray.length > 1 ? userDataArray[1][1] : ""; // Assuming user name is the second item
  const userEmail = userDataArray.length > 1 ? userDataArray[2][1] : "";
  const companyID = userDataArray.length > 1 ? userDataArray[0][1] : "";
  const currentPlan = userDataArray.length > 1 ? userDataArray[3][1] : "";

  const [editProfile, setEditProfileActive] = useState(false);
  const [newProfile, setNewProfile] = useState({
    company_name: cmcName,
    email: userEmail,
    password: null,
  });

  // Function to update email in userData and localStorage
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setNewProfile((prev) => ({ ...prev, email: newEmail }));

    // Update email in userData
    if (userData) {
      const updatedUserData = { ...userData, email: newEmail };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    handleProfileChange(e);
  };

  // Function to update company name in userData and localStorage
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setNewProfile((prev) => ({ ...prev, company_name: newName }));

    if (userData) {
      const updatedUserData = { ...userData, cmcName: newName };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    handleProfileChange(e);
  };

  const handleProfileChange = async (e) => {
    setNewProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(newProfile);
  };

  // const token = sessionStorage.getItem("token");
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        `http://localhost:3000/api/v1/cmc/${companyID}`,
        newProfile,
        config
      )
      .then((res) => {
        console.log("res: ", res);
        console.log("User data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });

    console.log("Form submitted", newProfile);
    console.log("token: ", token);
  };

  return (
    <div className="edit__account__home">
      <div>
        <Link to="/DashBoardHomeCMC">
          <MdKeyboardDoubleArrowLeft size={40} />
        </Link>
      </div>
      <div className="body__container">
        <div className="card__container">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="col-lg-12 user__title">
                <p>CMC Page</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-8 col-sm-12">
                  <div className="row justify-content-center">
                    <div className="col-lg-5 col-sm-2 headers">
                      <p>Name: </p>
                      <p>Email: </p>
                      <p>Current Plan: </p>
                    </div>
                    <div
                      className={`col-lg-5 col-sm-4 information ${
                        !editProfile ? "" : "editable"
                      }`}
                    >
                      {!editProfile ? (
                        <>
                          <p>{newProfile.company_name}</p>
                          <p>{newProfile.email}</p>
                          <p>{currentPlan}</p>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={newProfile.company_name}
                            onChange={handleNameChange}
                            name="name"
                          />
                          <input
                            type="email"
                            value={newProfile.email}
                            onChange={handleEmailChange}
                            name="email"
                          />
                          <p>{currentPlan}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 editpage__buttons">
                  <button
                    style={{ backgroundColor: "black", color: "white" }}
                    onClick={() => setEditProfileActive(!editProfile)}
                  >
                    Update Info
                  </button>
                  <button
                    style={{ color: "white", backgroundColor: "black" }}
                    onClick={() => setEditProfileActive(!editProfile)}
                    type="submit"
                  >
                    Done
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditAccountCMC;
