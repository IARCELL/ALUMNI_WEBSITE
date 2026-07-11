// import React from 'react'
// import React from "react";
import './Footer.css';
import iarLogo from '../../assets/iar3.jpg';
import { FaHotel, FaGlobe, FaLinkedin, FaInstagram, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <div className="brand-header">
              <img src={iarLogo} alt="IAR CELL" className="footer-logo" />
              <div className="brand-text">
                <h3>IAR CELL</h3>
                <p className="tagline">&ldquo;Global Opportunities, Lifelong Connections&rdquo;</p>
              </div>
            </div>
          </div>
          <div className="footer-section">
            <h3>USEFUL LINKS</h3>
            <ul>
              <li><a href="https://iitpkd.ac.in/guest-house-hamsanandi"><FaHotel className="footer-icon" /> Guest-House</a></li>
              <li><a href="https://ir.iitpkd.ac.in/"><FaGlobe className="footer-icon" /> International Relations website</a></li>
              <li><a href="https://www.linkedin.com/in/iit-palakkad-alumni-relations-19142a25b/"><FaLinkedin className="footer-icon" /> LinkedIn - Alumni Relations</a></li>
              <li><a href="https://www.linkedin.com/company/international-relations-iit-palakkad/"><FaLinkedin className="footer-icon" /> LinkedIn - International Relations</a></li>
              <li><a href="https://www.instagram.com/iarcell.iitpkd/"><FaInstagram className="footer-icon" /> Instagram</a></li>
              <li><a href="http://www.youtube.com/@IARCellIITPalakkad"><FaYoutube className="footer-icon" /> YouTube</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>CONTACT US</h3>
            <div className="footer-contact-info">
              <p className="address_data"><FaMapMarkerAlt className="footer-icon" /> Second Floor (Left Wing), Dr. APJ Abdul Kalam Block,</p>
              <p className="address_data">  Indian Institute of Technology Palakkad,</p>
              <p className="address_data">  Kanjikode West, Palakkad - 678623, Kerala.</p>
              <p className="address_data"><FaEnvelope className="footer-icon" /> ar_office@iitpkd.ac.in</p>
              <p className="address_data"><FaPhone className="footer-icon" /> Mob: +91 7595911769</p>
              <p className="address_data"><FaPhone className="footer-icon" /> Landline: +91-4912 09 2111</p>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Copyright &copy;2025 Indian Institute of Technology Palakkad. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;