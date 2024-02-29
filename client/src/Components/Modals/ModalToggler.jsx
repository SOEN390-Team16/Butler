import React from "react";
import PropTypes from "prop-types";
import {useModal} from "./Modal.jsx";

export default function ModalToggler(props) {
  const {toggle} = useModal();
  const {children, ...otherProps} = props;

  return (
    React.cloneElement(children, {...otherProps, onClick: toggle})
  )
}

ModalToggler.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}