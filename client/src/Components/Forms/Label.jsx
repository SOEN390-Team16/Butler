import PropTypes from "prop-types";

export default function Label(props) {
  return (
      <label htmlFor={props.htmlFor} className={`text-[#52525C]${props.className ? ` ${props.className}` : ''}`}>
        {props.children}
      </label>
  )
}

Label.propTypes = {
  htmlFor: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
