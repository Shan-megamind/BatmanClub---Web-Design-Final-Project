import { useState } from 'react';
import FormInput from './FormInput';
import './SubscribeForm.css';

const SubscribeForm = ({ patronName, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.confirmEmail) {
      newErrors.confirmEmail = "Please confirm your email";
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Emails do not match";
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    onSubmit(formData.email);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <p className="form-description">Stay updated with {patronName}'s community activities and alerts by subscribing below:</p>
      
      <FormInput
        type="email"
        id="email"
        name="email"
        label="Email Address"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        required
      />
      
      <FormInput
        type="email"
        id="confirmEmail"
        name="confirmEmail"
        label="Confirm Email"
        value={formData.confirmEmail}
        onChange={handleInputChange}
        error={errors.confirmEmail}
        required
      />
      
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Subscribe
        </button>
      </div>
    </form>
  );
};

export default SubscribeForm;