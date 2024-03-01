import React from "react";
import "./SideDrawer.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import image from "../../pictures/loginHero.jpg";

// The sidedrawer container has all information for navigating between links to see the different features.

const SideDrawer = (props) => {
  // Retrieve userData from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  // Get cmcName from userData, or fallback to an empty string if userData is not available
  // const cmcName = userData ? userData.cmcName : "";

  // Convert userData object to array of entries
  const userDataArray = userData ? Object.entries(userData) : [];

  // Get user name from userDataArray by index, or fallback to an empty string
  const firstName = userDataArray.length > 1 ? userDataArray[1][1] : ""; // Assuming user name is the second item
  const lastName = userDataArray.length > 1 ? userDataArray[2][1] : "";

  // Function to handle logout
  const handleLogout = () => {
    // Clear userData from localStorage
    localStorage.removeItem("userData");
  };

  return (
    // Conditional rendering on wether the drawer is open or not.
    <div className={`sideDrawer ${props.isOpen ? "open" : ""}`}>
      <div className="closeButton" onClick={props.onClose}>
        <FaArrowLeft style={{ color: "black" }} />
      </div>
      <div className="company__tag">
        <Link to="/DashboardHome">
          <h1>Butler.</h1>
        </Link>
        <div className="profile__info">
          <div className="profile__picture">
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: "100%", objectFit: "cover" }}
            />
          </div>
          <div className="greeting">
            <p>
              Welcome back <MdWavingHand />
            </p>
            <p className="user__name">
              {/* {props.firstName + " " + props.lastName} */}
              {firstName + " " + lastName}
            </p>
          </div>
        </div>
      </div>
      <ul className="">{props.children}</ul>
      <div className="drawer__buttons">
        <div className="edit__profile">
          <Link to="/DashboardHome/editUser">
            {" "}
            <button>Edit Profile</button>
          </Link>
        </div>
        <div className="log__out">
          <Link to="/" onClick={handleLogout}>
            <button> Log Out</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
