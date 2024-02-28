import PropTypes from "prop-types";
import {createContext, useContext, useState} from "react";

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext)
}

export default function Modal(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <ModalContext.Provider value={{isOpen, toggle}}>
      {props.children}
    </ModalContext.Provider>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
}