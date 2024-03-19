import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function EditButton(props) {
  return (
    <Link className="flex flex-row items-center text-white font-bold text-inter bg-[#008DDA] hover:bg-[#41C9E2]
    px-4 py-2.5 rounded-[5px] w-fit border-none text-base"
          onClick={props.onClick}
          to={props.to}
    >

      {props.children}
    
    </Link>
  )
}

EditButton.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  onClick: PropTypes.func,
}