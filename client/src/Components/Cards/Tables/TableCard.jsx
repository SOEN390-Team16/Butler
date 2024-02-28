import PropTypes from "prop-types";

export default function TableCard(props) {
  return (
    <div className={
      `flex flex-col justify-between w-full h-fit p-8 bg-white rounded-[10px] border border-gray-400 
      shadow-xl ${props.className}`}
    >
      {props.children}
    </div>)
}

TableCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}