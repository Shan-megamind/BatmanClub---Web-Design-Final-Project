import { useState } from 'react';
import './ProfileField.css';

function ProfileField({ 
  label, 
  type, 
  value, 
  onSave, 
  validate = () => '', 
  options = [], 
  optionDisplay = null 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [error, setError] = useState('');
  
  const handleEdit = () => {
    setCurrentValue(value);
    setError('');
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    setCurrentValue(value);
    setError('');
  };
  
  const handleSave = () => {
    const validationError = validate(currentValue);
    
    if (validationError) {
      setError(validationError);
    } else {
      onSave(currentValue);
      setIsEditing(false);
      setError('');
    }
  };
  
  const handleChange = (e) => {
    const newValue = type === 'checkbox' ? e.target.checked : e.target.value;
    setCurrentValue(newValue);
    
    const validationError = validate(newValue);
    setError(validationError);
  };
  
  const renderEditControls = () => {
    if (type === 'select') {
      return (
        <select 
          id={`field-${label}`}
          value={currentValue} 
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${label}` : undefined}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option.split('/').pop()}
            </option>
          ))}
        </select>
      );
    } else if (type === 'checkbox') {
      return (
        <input 
          id={`field-${label}`}
          type="checkbox" 
          checked={currentValue} 
          onChange={handleChange}
          aria-describedby={error ? `error-${label}` : undefined}
        />
      );
    } else {
      return (
        <input 
          id={`field-${label}`}
          type="text" 
          value={currentValue} 
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `error-${label}` : undefined}
        />
      );
    }
  };
  
  const renderDisplayValue = () => {
    if (type === 'select' && optionDisplay) {
      return optionDisplay(value);
    } else if (type === 'checkbox') {
      return value ? 'Yes' : 'No';
    } else {
      return value;
    }
  };

  return (
    <div className="profile-field">
      <div className="field-label">
        <label htmlFor={isEditing ? `field-${label}` : undefined}>{label}:</label>
      </div>
      
      <div className="field-content">
        {isEditing ? (
          <>
            <div className="field-edit">
              {renderEditControls()}
              {error && (
                <p id={`error-${label}`} className="validation-error" role="alert">
                  {error}
                </p>
              )}
            </div>
            <div className="field-actions">
              <button 
                className="save-button"
                onClick={handleSave}
                aria-label={`Save ${label}`}
              >
                <span className="button-icon">✓</span> Save
              </button>
              <button 
                className="cancel-button"
                onClick={handleCancel}
                aria-label={`Cancel editing ${label}`}
              >
                <span className="button-icon">✕</span> Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="field-value">
              {renderDisplayValue()}
            </div>
            <div className="field-actions">
              <button 
                className="edit-button"
                onClick={handleEdit}
                aria-label={`Edit ${label}`}
              >
                <span className="button-icon">✎</span> Edit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileField;