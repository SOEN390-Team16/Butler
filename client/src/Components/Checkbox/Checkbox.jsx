import React, { useState } from "react";
import "./Checkbox.css";

const Checkbox = ({ label, isChecked, onChange }) => {
  return (
    <label className="custom-checkbox-container">
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      <span className="checkmark"></span>
      <span className="checkbox-label">{label}</span>
    </label>
  );
};

export default Checkbox;
