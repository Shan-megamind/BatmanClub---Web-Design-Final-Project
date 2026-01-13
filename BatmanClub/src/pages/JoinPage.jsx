import { useState } from 'react';
import './JoinPage.css';
import Form from '../components/Form';

const JoinPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  
  // Form fields configuration added to Form (skeleton) component
  const formFields = {
    name: {
      type: 'text',
      label: 'Full Name',
      required: true
    },
    email: {
      type: 'text',
      label: 'Email Address',
      required: true
    },
    phone: {
      type: 'tel',
      label: 'Phone Number (optional)',
      placeholder: 'e.g., 555-123-4567'
    },
    howHeard: {
      type: 'select',
      label: 'How did you hear about us?',
      required: true,
      placeholder: 'Select an option',
      options: [
        'Social Media',
        'Friend or Family',
        'News Article',
        'Community Event',
        'Other'
      ],
      controls: ['otherHowHeard']
    },
    otherHowHeard: {
      type: 'text',
      label: 'Please specify',
      required: true,
      condition: (data) => data.howHeard === 'Other'
    },
    hasAlias: {
      type: 'checkbox',
      label: 'I have a superhero alias',
      controls: ['alias'],
      clearOnUncheck: true
    },
    alias: {
      type: 'text',
      label: 'Superhero Alias',
      required: true,
      placeholder: 'e.g., The Night Guardian',
      condition: (data) => data.hasAlias
    },
    primarySkill: {
      type: 'select',
      label: 'Primary Area of Expertise',
      required: true,
      options: [
        { value: '', label: 'Select a primary skill' },
        'Combat Training',
        'Technical Skills',
        'Medical Expertise',
        'Community Organizing',
        'Detective Work'
      ],
      controls: ['secondarySkill']
    },
    secondarySkill: {
      type: 'select',
      label: 'Specific Skill',
      required: true,
      condition: (data) => data.primarySkill && data.primarySkill !== '',
      options: (data) => {
        const skillOptions = {
          'Combat Training': [
            'Martial Arts',
            'Weapons Training',
            'Self-Defense Instruction',
            'Tactical Planning'
          ],
          'Technical Skills': [
            'Computer Programming',
            'Mechanical Engineering',
            'Electronics',
            'Cybersecurity'
          ],
          'Medical Expertise': [
            'First Aid',
            'Emergency Response',
            'Counseling',
            'Rehabilitation'
          ],
          'Community Organizing': [
            'Event Planning',
            'Fundraising',
            'Public Speaking',
            'Volunteer Coordination'
          ],
          'Detective Work': [
            'Investigation',
            'Surveillance',
            'Research',
            'Forensics'
          ]
        };
        
        return data.primarySkill ? 
          [{ value: '', label: 'Select a specific skill' }, ...(skillOptions[data.primarySkill] || [])] : 
          [{ value: '', label: 'Select a specific skill' }];
      }
    },
    availability: {
      type: 'checkbox-group',
      label: 'Availability',
      required: true,
      options: [
        'Weekday Evenings',
        'Weekday Daytime',
        'Weekends',
        'Late Nights'
      ]
    },
    motivation: {
      type: 'textarea',
      label: 'Why do you want to join the Neighborhood Batman Club?',
      required: true,
      placeholder: 'Tell us why you want to be part of the Neighborhood Batman Club...',
      rows: 5
    },
    agreeToCode: {
      type: 'checkbox',
      label: 'I agree to the Batman Code of Conduct: to protect the innocent, seek justice, and never use lethal force',
      required: true
    }
  };
  
  const formSections = [
    {
      title: 'Personal Information',
      fields: ['name', 'email', 'phone', 'howHeard', 'otherHowHeard', 'hasAlias', 'alias']
    },
    {
      title: 'Skills & Expertise',
      fields: ['primarySkill', 'secondarySkill', 'availability']
    },
    {
      title: 'Why Batman?',
      fields: ['motivation', 'agreeToCode']
    }
  ];
  
  const validationRules = {
    name: (value) => !value.trim() ? 'Name is required' : '',
    email: (value) => {
      if (!value.trim()) return 'Email is required';
      if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email address';
      return '';
    },
    phone: (value) => {
      if (!value) return '';
      if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
        return 'Please enter a valid 10-digit phone number';
      }
      return '';
    },
    howHeard: (value) => !value ? 'Please select an option' : '',
    otherHowHeard: (value, data) => {
      if (data.howHeard === 'Other' && !value.trim()) {
        return 'Please specify how you heard about us';
      }
      return '';
    },
    alias: (value, data) => {
      if (data.hasAlias && !value.trim()) {
        return 'Please enter your superhero alias';
      }
      return '';
    },
    primarySkill: (value) => {
      if (!value || value === '') {
        return 'Please select a primary skill';
      }
      return '';
    },
    secondarySkill: (value, data) => {
      if (data.primarySkill && data.primarySkill !== '' && !value) {
        return 'Please select a secondary skill';
      }
      return '';
    },
    availability: (value) => {
      if (!value || value.length === 0) {
        return 'Please select at least one availability option';
      }
      return '';
    },
    motivation: (value) => {
      if (!value.trim()) {
        return 'Please tell us why you want to join';
      }
      if (value.length < 20) {
        return 'Please provide more detail (at least 20 characters)';
      }
      return '';
    },
    agreeToCode: (value) => !value ? 'You must agree to the Batman Code of Conduct' : ''
  };
  
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    howHeard: '',
    otherHowHeard: '',
    hasAlias: false,
    alias: '',
    primarySkill: '',
    secondarySkill: '',
    availability: [],
    motivation: '',
    agreeToCode: false
  };
  
  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    setSubmittedData(formData);
    setIsSubmitted(true);
  };
  
  if (isSubmitted) {
    return (
      <div className="join-page">
        <div className="grid-container">
          <div className="success-message">
            <h2>Welcome to the Neighborhood Batman Club!</h2>
            <p>Thank you for joining us, {submittedData.hasAlias ? submittedData.alias : submittedData.name}!</p>
            <p>We've received your application and will be in touch soon with next steps. In the meantime, prepare to become the hero your neighborhood deserves!</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="join-page">
      <h1 className="page-title">Join The Neighborhood Batman Club</h1>
      <p className="page-description">Ready to make a difference in your community? Fill out the form below to join our network of everyday heroes.</p>
      
      <div className="grid-container">
        <div className="form-container">
          <Form
            fields={formFields}
            sections={formSections}
            validationRules={validationRules}
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            submitButtonText="Join The Club"
          />
        </div>
        
        <div className="form-sidebar">
          <div className="sidebar-content">
            <h3>Why Join Us?</h3>
            <ul>
              <li>Connect with like-minded heroes in your community</li>
              <li>Receive training and resources to make a difference</li>
              <li>Participate in community service projects</li>
              <li>Network with other Neighborhood Batman Club chapters</li>
              <li>Make your community safer and stronger</li>
            </ul>
            
            <div className="bat-quote">
              <p>"It's not who I am underneath, but what I do that defines me."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;