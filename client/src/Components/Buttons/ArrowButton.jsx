import PropTypes from "prop-types";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

// ArrowButton component
export default function ArrowButton({ to, children }) {
  return (
    <Link
      className="flex items-center text-black hover:text-gray-800"
      to={to}
    >
      {children}
      <IoMdArrowForward style={{ fontSize: "20px" }} />
    </Link>
  );
}

ArrowButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

