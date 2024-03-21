import PropTypes from "prop-types";
import "./ContinueButton.css";

const ContinueButton = (props) => {
  return (
    <div className="continue__button">
      <button onClick={props.onClick}>{props.name}</button>
    </div>
  );
};

// Define prop types for validation
ContinueButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ContinueButton;
