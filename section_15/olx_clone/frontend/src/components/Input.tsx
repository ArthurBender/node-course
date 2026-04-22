import { useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputProps {
  type: string;
  label: string;
  name: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  minLength?: number;
  required?: boolean;
  multiple?: boolean;
  options?: string[];
  min?: number;
}

const Input = ({ type, label, name, onChange, value, hint, minLength, min, options, required = false, multiple = false }: InputProps) => {
  const isPhoneInput = type === 'phone';
  const isPasswordInput = type === 'password';
  const isTextArea = type === 'textarea';
  const isSelect = type === 'select';
  const isDefaultInput = !isPhoneInput && !isTextArea && !isSelect;
  
  const handleChange = (value?: string) => {
    if (onChange) {
      onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>

      {/* Phone Input */}
      {isPhoneInput && (
        <PhoneInput
          name={name}
          value={value as string}
          onChange={handleChange}
          required={required}
          flags={flags}
          defaultCountry="BR"
          limitMaxLength={true}
        />
      )}

      {/* Select */}
      {isSelect && (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(value) => handleChange(value.target.value)}
          required={required}
        >
          <option value="">Select an option...</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* Textarea */}
      {isTextArea && (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(value) => handleChange(value.target.value)}
          required={required}
          minLength={minLength}
          rows={3}
        />
      )}

      {isDefaultInput && (
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          minLength={minLength}
          multiple={multiple}
          min={min}
        />
      )}

      {isPasswordInput && (
        <button type="button" onClick={togglePassword} className="password-toggle">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}

      {hint && <span className="form-hint">{hint}</span>}
    </div>
  )
}

export default Input;