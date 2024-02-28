import React from "react";
import PropTypes from "prop-types";

export default function TableHeader(props) {
  return (
    <tr className={"text-base font-semibold bg-[#B1C6D3]"}>
      {React.Children.map(props.children, child =>
        React.cloneElement(child,
          {className: `${child.props.className ? child.props.className + ' ' : ''}px-8 py-6 font-semibold`})
      )}
    </tr>

  )
}

TableHeader.propTypes = {
  children: PropTypes.node,
}