import PropTypes from "prop-types";
import React from "react";

export default function TableRow(props) {
  return (
    <tr className="border border-gray-600">
      {React.Children.map(props.children, child =>
        React.cloneElement(child, {
          className: `${child.props.className ? child.props.className + ' ' : ''}px-8 py-6`})
      )}
    </tr>
  );
}


TableRow.propTypes = {
  children: PropTypes.node.isRequired,
}