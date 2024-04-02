import React from "react";

const Dropdown = ({ options, defaultValue, onChange }) => {
  return (
    <select
      defaultValue={defaultValue}
      onChange={onChange}
      className="dropdown"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

// to see how this component is used, check client/src/Components/ServiceRequestPageCMC/ServiceRequestCMC.jsx
