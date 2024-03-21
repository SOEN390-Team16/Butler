import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IoIosKey } from "react-icons/io";

export default function KeyButton(props) {
  return (
    <Link
      className="flex flex-row items-center gap-2.5 text-white font-semibold bg-[#FBBC05] hover:bg-[#fbbd05bb]
      px-8 py-4 rounded-md shadow-md"
      onClick={props.onClick}
      to={props.to}
    >
      <IoIosKey className="font-extrabold" fontWeight={1} size={24} />
      {props.children}
    </Link>
  );
}

KeyButton.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  onClick: PropTypes.func,
};
