import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function DeleteButton({ onClick, to, children }) {
  return (
    <Link
      className="flex flex-row items-center text-white font-bold text-inter bg-[#ea4335] hover:bg-[#892222]
      px-4 py-2.5 rounded-[5px] w-fit border-none text-base"
      onClick={onClick}
      to={to}
    >
      {children}
    </Link>
  );
}

DeleteButton.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
