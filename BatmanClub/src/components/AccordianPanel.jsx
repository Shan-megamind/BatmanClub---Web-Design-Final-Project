import { useState } from 'react';
import './AccordianPanel.css';

const AccordionPanel = ({ 
  id,
  name,
  alias,
  image,
  shortDesc,
  fullDesc,
  onSubscribe
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const togglePanel = () => {
    setIsExpanded(!isExpanded);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      togglePanel();
    }
  };
  
  return (
    <div 
      className="patron-panel"
      role="region"
      aria-labelledby={`patron-header-${id}`}
    >
      <div className="patron-panel-header">
        <div className="patron-info">
          <div className="patron-image-container">
            <img src={image} alt={`${name}, ${alias}`} className="patron-image" />
          </div>
          <div className="patron-text">
            <h3 id={`patron-header-${id}`} className="patron-name">{name}</h3>
            <p className="patron-alias">{alias}</p>
            <p className="patron-short-desc">{shortDesc}</p>
          </div>
        </div>
        <button 
          className="read-more-btn"
          onClick={togglePanel}
          onKeyDown={handleKeyDown}
          aria-expanded={isExpanded ? "true" : "false"}
          aria-controls={`patron-content-${id}`}
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
      
      {isExpanded && (
        <div 
          id={`patron-content-${id}`}
          className="patron-panel-content"
        >
          <p className="patron-full-desc">{fullDesc}</p>
          <button 
            className="subscribe-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSubscribe();
            }}
          >
            Subscribe to Alerts
          </button>
        </div>
      )}
    </div>
  );
};

export default AccordionPanel;