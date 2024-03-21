import PropTypes from "prop-types";
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

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
