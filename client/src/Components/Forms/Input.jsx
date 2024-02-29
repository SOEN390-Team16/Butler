import PropTypes from "prop-types";

export default function Input(props) {

  return (
    <input className={`border border-gray-400 rounded-lg px-4 py-3${props.className ? ' ' + props.className : ''}`}
           id={props.id}
           name={props.name}
           type={props.type}
           onChange={props.onChange}
           value={props.value}/>
  )
}

Input.propTypes = {
  className: PropTypes.node,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
}