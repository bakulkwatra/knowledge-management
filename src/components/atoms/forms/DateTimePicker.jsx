import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputText from "../forms/InputText";

const DateTimePicker = ({ selected, onChange, ...rest }) => (
  <ReactDatePicker
    selected={selected}
    onChange={onChange}
    showTimeSelect
    dateFormat="Pp"
    customInput={<InputText />}
    {...rest}
  />
);

export default DateTimePicker;