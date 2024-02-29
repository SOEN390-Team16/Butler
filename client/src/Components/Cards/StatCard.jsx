import PropTypes from "prop-types";
import { IoArrowForward } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function StatCard(props) {
  return (
    <div className="flex flex-col justify-between w-64 h-32 p-4 bg-white rounded border border-gray-400 shadow-md">
      <div className="flex justify-between items-start">
        <h3 className="text font-semibold text-wrap">{props.title}</h3>
        <Link className="" to={props.link}>
          <IoArrowForward size={24} />
        </Link>
      </div>
      <div>
        <h1 className="text-4xl font-semibold">{props.value}</h1>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
