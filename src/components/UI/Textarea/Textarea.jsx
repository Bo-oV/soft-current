import './Textarea.scss'

function Textarea({ label, name, placeholder, value, onChange }) {
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
  )
}

export default Textarea
