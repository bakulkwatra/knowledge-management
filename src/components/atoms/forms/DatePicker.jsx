import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputText from "../forms/InputText";

const DatePicker = ({ selected, onChange, ...rest }) => (
  <ReactDatePicker
    selected={selected}
    onChange={onChange}
    dateFormat="yyyy-MM-dd"
    customInput={<InputText />}
    {...rest}
  />
);

export default DatePicker;