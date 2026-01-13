import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="copyright">© {currentYear} Neighborhood Batman Club. All rights reserved.</p>
        <p className="footer-tagline">*The heroes Gotham deserves, but not the ones it needs right now.*</p>
      </div>
    </footer>
  );
};

export default Footer;