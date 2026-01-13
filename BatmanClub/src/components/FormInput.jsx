import './FormInput.css';

const FormInput = ({ 
  type = 'text',
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  className = '',
  ...props
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder={placeholder}
        required={required}
        {...props}
      />
      
      {error && (
        <div id={`${id}-error`} className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;