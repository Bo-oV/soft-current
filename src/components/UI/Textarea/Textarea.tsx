import type { ChangeEventHandler } from "react";
import "./Textarea.scss";

type TextareaProps = {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

function Textarea({
  label,
  name,
  placeholder,
  value,
  onChange,
}: TextareaProps) {
  return (
    <label className="textarea-field">
      <span className="textarea-field__label">{label}</span>
      <textarea
        className="textarea-field__control"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default Textarea;
