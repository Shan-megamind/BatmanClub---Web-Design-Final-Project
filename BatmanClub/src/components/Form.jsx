import { useState, useEffect } from 'react';
import './Form.css';

const Form = ({ 
  initialValues = {},
  fields,
  sections,
  validationRules,
  onSubmit,
  submitButtonText = "Submit"
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (e.target.dataset.group) {
        const group = e.target.dataset.group;
        const currentValues = [...(formData[group] || [])];
        
        if (checked) {
          if (!currentValues.includes(value)) {
            currentValues.push(value);
          }
        } else {
          const index = currentValues.indexOf(value);
          if (index !== -1) {
            currentValues.splice(index, 1);
          }
        }
        
        setFormData({
          ...formData,
          [group]: currentValues
        });
      } else {
        setFormData({
          ...formData,
          [name]: checked
        });
        
        const field = fields[name];
        if (field && field.controls) {
          if (!checked && field.clearOnUncheck) {
            const clearedValues = {};
            
            field.controls.forEach(controlName => {
              clearedValues[controlName] = '';
            });
            
            setFormData(prev => ({
              ...prev,
              ...clearedValues
            }));
          }
        }
      }
    } else if (type === 'select-one') {
      setFormData({
        ...formData,
        [name]: value
      });
      
      const field = fields[name];
      if (field && field.controls) {
        const resetValues = {};
        field.controls.forEach(controlField => {
          resetValues[controlField] = '';
        });
        
        setFormData(prev => ({
          ...prev,
          ...resetValues
        }));
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    setTouched({
      ...touched,
      [name]: true
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(validationRules).forEach(fieldName => {
      const field = fields[fieldName];
      if (field && field.condition && !field.condition(formData)) {
        return;
      }
      
      const value = formData[fieldName];
      const rule = validationRules[fieldName];
      
      if (rule && typeof rule === 'function') {
        const error = rule(value, formData);
        if (error) {
          newErrors[fieldName] = error;
        }
      }
    });
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const allTouched = {};
    Object.keys(fields).forEach(field => {
      allTouched[field] = true;
    });
    setTouched(allTouched);
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      
      const firstErrorId = Object.keys(formErrors)[0];
      const element = document.getElementById(firstErrorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    onSubmit(formData);
  };
  
  const renderField = (fieldName) => {
    const field = fields[fieldName];
    if (!field) return null;
    
    if (field.condition && !field.condition(formData)) {
      return null;
    }
    
    const hasError = errors[fieldName] && touched[fieldName];
    
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <div className="form-group">
            <label htmlFor={fieldName}>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <input
              type="text"
              id={fieldName}
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={handleInputChange}
              className={hasError ? 'error' : ''}
              aria-describedby={hasError ? `${fieldName}-error` : undefined}
              aria-invalid={hasError ? "true" : "false"}
              placeholder={field.placeholder || ''}
            />
            {hasError && (
              <div id={`${fieldName}-error`} className="error-message" role="alert">
                {errors[fieldName]}
              </div>
            )}
          </div>
        );
        
      case 'select':
        return (
          <div className="form-group">
            <label htmlFor={fieldName}>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <select
              id={fieldName}
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={handleInputChange}
              className={hasError ? 'error' : ''}
              aria-describedby={hasError ? `${fieldName}-error` : undefined}
              aria-invalid={hasError ? "true" : "false"}
            >
              {field.placeholder && (
                <option value="">{field.placeholder}</option>
              )}
              {field.options && field.options.map((option, index) => (
                <option key={index} value={option.value || option}>
                  {option.label || option}
                </option>
              ))}
            </select>
            {hasError && (
              <div id={`${fieldName}-error`} className="error-message" role="alert">
                {errors[fieldName]}
              </div>
            )}
          </div>
        );
        
      case 'textarea':
        return (
          <div className="form-group">
            <label htmlFor={fieldName}>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            <textarea
              id={fieldName}
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={handleInputChange}
              className={hasError ? 'error' : ''}
              aria-describedby={hasError ? `${fieldName}-error` : undefined}
              aria-invalid={hasError ? "true" : "false"}
              placeholder={field.placeholder || ''}
              rows={field.rows || 5}
            />
            {hasError && (
              <div id={`${fieldName}-error`} className="error-message" role="alert">
                {errors[fieldName]}
              </div>
            )}
          </div>
        );
        
      case 'checkbox':
        return (
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id={fieldName}
              name={fieldName}
              checked={!!formData[fieldName]}
              onChange={handleInputChange}
              className={hasError ? 'error' : ''}
              aria-describedby={hasError ? `${fieldName}-error` : undefined}
            />
            <label htmlFor={fieldName}>
              {field.label} {field.required && <span className="required">*</span>}
            </label>
            {hasError && (
              <div id={`${fieldName}-error`} className="error-message" role="alert">
                {errors[fieldName]}
              </div>
            )}
          </div>
        );
        
      case 'checkbox-group':
        return (
          <div className="form-group">
            <p className="checkbox-label">
              {field.label} {field.required && <span className="required">*</span>}
            </p>
            <div className="checkbox-grid">
              {field.options && field.options.map((option, index) => (
                <div key={index} className="checkbox-group">
                  <input
                    type="checkbox"
                    id={`${fieldName}-${index}`}
                    name={`${fieldName}-${index}`}
                    value={option.value || option}
                    data-group={fieldName}
                    checked={(formData[fieldName] || []).includes(option.value || option)}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`${fieldName}-${index}`}>
                    {option.label || option}
                  </label>
                </div>
              ))}
            </div>
            {hasError && (
              <div className="error-message" role="alert">
                {errors[fieldName]}
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <form onSubmit={handleSubmit} noValidate>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="form-section">
          {section.title && (
            <h2 className="section-title">{section.title}</h2>
          )}
          
          {section.fields.map((fieldName) => (
            <div key={fieldName} className="form-row">
              {renderField(fieldName)}
            </div>
          ))}
        </div>
      ))}
      
      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {submitButtonText}
        </button>
      </div>
    </form>
  );
};

export default Form;