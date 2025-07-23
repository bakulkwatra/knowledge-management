import Select from "react-select";

const MultiSelect = ({ options = [], ...rest }) => {
  return (
    <Select
      isMulti
      options={options}
      className="react-select-container"
      classNamePrefix="react-select"
      {...rest}
    />
  );
};

export default MultiSelect;