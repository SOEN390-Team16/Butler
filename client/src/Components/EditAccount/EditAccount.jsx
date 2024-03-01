import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaImagePortrait } from "react-icons/fa6";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import "./EditAccount.css";

const EditAccount = (props) => {
  // Retrieve userData from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  // Convert userData object to array of entries
  const userDataArray = userData ? Object.entries(userData) : [];
  // Get user name from userDataArray by index, or fallback to an empty string
  const firstName = userDataArray.length > 1 ? userDataArray[1][1] : ""; // Assuming user name is the second item
  const lastName = userDataArray.length > 1 ? userDataArray[2][1] : "";
  const userEmail = userDataArray.length > 1 ? userDataArray[3][1] : "";
  const userID = userDataArray.length > 1 ? userDataArray[0][1] : "";
  const currentPlan = userDataArray.length > 1 ? userDataArray[4][1] : "";

  const [image, setImage] = useState(null);
  const [editProfile, setEditProfileActive] = useState(false);
  const [newProfile, setNewProfile] = useState({
    profilePicture: { image },
    username: "Username",
    firstName: firstName,
    lastName: lastName,
    email: userEmail,
    phone: "+1 514 123 4567",
    status: currentPlan,
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

  // Function to update first name in userData and localStorage
  const handleFirstNameChange = (e) => {
    const newFirstName = e.target.value;
    setNewProfile((prev) => ({ ...prev, firstName: newFirstName }));

    // Update first name in userData
    if (userData) {
      const updatedUserData = { ...userData, firstName: newFirstName };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    handleProfileChange(e);
  };

  // Function to update last name in userData and localStorage
  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setNewProfile((prev) => ({ ...prev, lastName: newLastName }));

    // Update last name in userData
    if (userData) {
      const updatedUserData = { ...userData, lastName: newLastName };
      localStorage.setItem("userData", JSON.stringify(updatedUserData));
    }
    handleProfileChange(e);
  };

  const handleProfileChange = async (e) => {
    setNewProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(newProfile);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setNewProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
      reader.readAsDataURL(file);
    }
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

    if (image) {
      // Update the newProfile state with the selected image
      setNewProfile((prev) => ({ ...prev, profilePicture: { image } }));
    }

    axios
      .patch(`http://localhost:3000/api/v1/pu/${userID}`, newProfile, config)
      .then(() => {
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
        <Link to="/DashBoardHome">
          <MdKeyboardDoubleArrowLeft size={40} />
        </Link>
      </div>
      <div className="body__container">
        <div className="card__container">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="col-lg-12 user__title">
                <p>User Page</p>
              </div>
              <div className="row justify-content-center">
                <div className="col-lg-4 col-sm-12 profile__img">
                  {image && (
                    <img
                      src={image}
                      alt="Uploaded"
                      style={{ maxWidth: "100%", objectFit: "cover" }}
                    />
                  )}
                  {!image && (
                    <>
                      <label htmlFor="imageInput">
                        <FaImagePortrait size={90} />
                        <p>
                          Upload Image <MdOutlineFileUpload size={25} />
                        </p>
                      </label>
                      <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </>
                  )}
                </div>
                <div className="col-lg-8 col-sm-12">
                  <div className="row justify-content-center">
                    <div className="col-lg-5 col-sm-2 headers">
                      <p>Username: </p>
                      <p>First name: </p>
                      <p>Last name: </p>
                      <p>Email: </p>
                      <p>Phone Number: </p>
                      <p>Current Plan: </p>
                    </div>
                    <div
                      className={`col-lg-5 col-sm-4 information ${
                        !editProfile ? "" : "editable"
                      }`}
                    >
                      {!editProfile ? (
                        <>
                          <p>{newProfile.username}</p>
                          <p>{newProfile.firstName}</p>
                          <p>{newProfile.lastName}</p>
                          <p>{newProfile.email}</p>
                          <p>{newProfile.phone} </p>
                          <p>{newProfile.status}</p>
                        </>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={newProfile.username}
                            style={{ margin: "0" }}
                            onChange={handleProfileChange}
                            name="username"
                          />
                          <input
                            type="text"
                            value={newProfile.firstName}
                            onChange={handleFirstNameChange}
                            name="firstName"
                          />
                          <input
                            type="text"
                            value={newProfile.lastName}
                            onChange={handleLastNameChange}
                            name="lastName"
                          />
                          <input
                            type="email"
                            value={newProfile.email}
                            onChange={handleEmailChange}
                            name="email"
                          />
                          <input
                            type="text"
                            value={newProfile.phone}
                            onChange={handleProfileChange}
                            name="phone"
                          />
                          <p>{newProfile.status}</p>
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
export default EditAccount;
