import PropTypes from "prop-types";
import {useModal} from "./Modal.jsx";
import {useEffect} from "react";
import {IoClose} from "react-icons/io5";

export default function ModalContent(props) {
  const {isOpen, toggle} = useModal();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        toggle();
        props.onExit();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggle]);

  const handleBackgroundClick = (event) => {
    if (event.currentTarget === event.target) {
      toggle();
      props.onExit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
         onClick={handleBackgroundClick}>
      <div className="bg-white p-16 rounded-lg relative flex flex-col gap-8 items-center">
        <button onClick={() => {
          toggle();
          props.onExit()
        }} className="absolute top-8 left-8 text-black">
          <IoClose size={24}/>
        </button>
        <h2 className={"text-black text-2xl font-bold font-raleway"}>{props.title}</h2>
        <h3 className={"text-black text-base font-medium font-raleway"}>{props.description}</h3>
        {props.children}
      </div>
    </div>)
}

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onExit: PropTypes.func,
}
