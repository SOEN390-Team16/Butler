import React from "react";
import { Link } from "react-router-dom";
import "./ContinueButton.css";

const ContinueButton = (props) => {
  // Continue button is the button that is used for logging in and signing up for accounts

  return (
    <div className="continue__button">
      <button onClick={props.onClick}>{props.name}</button>
    </div>
  );
};

export default ContinueButton;
