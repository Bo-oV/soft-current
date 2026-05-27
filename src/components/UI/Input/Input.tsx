import type { ChangeEventHandler } from "react";
import "./Input.scss";

type InputProps = {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
};

function Input({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <label className="input-field">
      <span className="input-field__label">{label}</span>
      <input
        className="input-field__control"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default Input;
