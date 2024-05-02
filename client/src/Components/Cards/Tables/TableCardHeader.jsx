import PropTypes from "prop-types";

export default function TableCardHeader(props) {
  return (<div className="flex flex-row items-center">
      <h2 className="flex-grow font-bold text-2xl">{props.title}</h2>
      <div className="flex flex-row">
        {props.children}
      </div>

    </div>
  )
}

TableCardHeader.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
}