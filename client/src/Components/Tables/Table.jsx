import PropTypes from "prop-types";

export default function Table(props) {
  return (
    <div
      className={"rounded-lg border border-gray-600 overflow-hidden text-inter"}
    >
      <table className={"w-full"}>{props.children}</table>
    </div>
  );
}

Table.propTypes = {
  children: PropTypes.node.isRequired,
};
