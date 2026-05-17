import './Input.scss'

function Input({ label, name, placeholder, value, onChange, type = 'text' }) {
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
  )
}

export default Input
