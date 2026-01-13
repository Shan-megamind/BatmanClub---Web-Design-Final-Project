import { useState, useRef, useEffect } from 'react';
import './Header.css';

const Header = ({ profile, onPageChange, currentPage }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const profileButtonRef = useRef(null);
  const navMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileOpen && 
        profileDropdownRef.current && 
        !profileDropdownRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);
  
  // Closes menu when clicked outside in smaller devices
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen && 
        navMenuRef.current && 
        !navMenuRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);
  
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  };
  
  const handleProfileKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleProfile();
    } else if (e.key === 'Escape' && isProfileOpen) {
      setIsProfileOpen(false);
    }
  };
  
  const handleHamburgerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    } else if (e.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  const handleNavigation = (page, event) => {
    event.preventDefault();
    onPageChange(page);
    setIsMenuOpen(false);
  };
  
  return (
    <header className="header">
      <div className="header-left">
        <div 
          className="logo-container"
          onClick={(e) => handleNavigation('home', e)}
          role="button"
          tabIndex="0"
          aria-label="Go to home page"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNavigation('home', e);
            }
          }}
        >
          <img src="/Images/batman-logo.jpg" alt="Batman Club Logo" className="logo" />
        </div>
      </div>
      
      <div className="header-center">
        <h1 className="title">Neighborhood Batman Club</h1>
        
        <div className="nav-container">
          <div 
            className="hamburger" 
            onClick={toggleMenu}
            onKeyDown={handleHamburgerKeyDown}
            ref={hamburgerRef}
            tabIndex="0"
            role="button"
            aria-expanded={isMenuOpen ? "true" : "false"}
            aria-controls="navigation-menu"
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          
          <nav 
            className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
            id="navigation-menu"
            ref={navMenuRef}
            aria-hidden={!isMenuOpen && window.innerWidth <= 640}
          >
            <ul>
              <li className={currentPage === 'home' ? 'active' : ''}>
                <a 
                  href="/" 
                  onClick={(e) => handleNavigation('home', e)}
                  aria-current={currentPage === 'home' ? 'page' : undefined}
                >
                  Home
                </a>
              </li>
              <li className={currentPage === 'patrons' ? 'active' : ''}>
                <a 
                  href="/patrons" 
                  onClick={(e) => handleNavigation('patrons', e)}
                  aria-current={currentPage === 'patrons' ? 'page' : undefined}
                >
                  Patrons
                </a>
              </li>
              <li className={currentPage === 'join' ? 'active' : ''}>
                <a 
                  href="/join" 
                  onClick={(e) => handleNavigation('join', e)}
                  aria-current={currentPage === 'join' ? 'page' : undefined}
                >
                  Join Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      <div className="header-right">
        <div className="profile-container">
          <div 
            className="profile-pic" 
            onClick={toggleProfile}
            onKeyDown={handleProfileKeyDown}
            ref={profileButtonRef}
            tabIndex="0"
            role="button"
            aria-expanded={isProfileOpen ? "true" : "false"}
            aria-controls="profile-dropdown"
            aria-label="Toggle profile menu"
          >
            <img src={profile.profilePic} alt="Profile" />
          </div>
          
          {isProfileOpen && (
            <div 
              className="profile-dropdown"
              id="profile-dropdown"
              ref={profileDropdownRef}
            >
              <p className="username">{profile.username}</p>
              <button 
                className="profile-btn" 
                onClick={() => {
                  onPageChange('profile');
                  setIsProfileOpen(false);
                }}
              >
                View Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;