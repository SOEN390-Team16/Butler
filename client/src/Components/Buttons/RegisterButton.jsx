import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function RegisterButton(props) {
  if (props.to) {
    return (
      <Link
        className="flex flex-row items-center text-white font-bold text-inter bg-[#34A853] hover:bg-green-600
        px-4 py-2.5 rounded-[5px] w-fit border-none text-base"
        onClick={props.onClick}
        to={props.to}
      >
        {props.children}
      </Link>
    );
  } else {
    // Render as button if no navigation is needed
    return (
      <button
        className="flex flex-row items-center text-white font-bold text-inter bg-[#34A853] hover:bg-green-600
        px-4 py-2.5 rounded-[5px] w-fit border-none text-base"
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  }
}

RegisterButton.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
