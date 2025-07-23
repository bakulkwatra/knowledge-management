import { InputText, Label, ErrorText } from "../atoms";

const InputField = ({ name, label, register, error, type = "text", placeholder, ...rest }) => {
  return (
    <div className="mb-4">
      <Label htmlFor={name}>{label}</Label>
      <InputText
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />
      <ErrorText>{error?.message}</ErrorText>
    </div>
  );
};

export default InputField;
