const Dropdown = ({ options, value, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="dropdown">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
