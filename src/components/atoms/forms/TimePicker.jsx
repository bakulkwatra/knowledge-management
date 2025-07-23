import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputText from "../forms/InputText";

const TimePicker = ({ selected, onChange, ...rest }) => (
  <ReactDatePicker
    selected={selected}
    onChange={onChange}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    timeCaption="Time"
    dateFormat="h:mm aa"
    customInput={<InputText />}
    {...rest}
  />
);

export default TimePicker;