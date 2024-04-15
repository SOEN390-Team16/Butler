import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function SubmitRequestButton(props) {
  return (
    <Link
      className="flex flex-row items-center gap-2.5 text-white font-semibold bg-[#34A853] hover:bg-green-600
      px-8 py-4 rounded-md shadow-md"
      onClick={props.onClick}
      to={props.to}
    >
      <IoMdAddCircleOutline className="font-extrabold" fontWeight={1} size={24} />
      {props.children}
    </Link>
  );
}

SubmitRequestButton.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired, 
  onClick: PropTypes.func,
};
