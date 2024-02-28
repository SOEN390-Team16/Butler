import PropTypes from "prop-types";

export default function TableCard(props) {
  return (
    <div className="flex flex-col justify-between w-full h-fit p-4 bg-white rounded border border-gray-400 shadow-md">
      {props.children}
    </div>)
}

TableCard.propTypes = {
  children: PropTypes.node.isRequired,
}