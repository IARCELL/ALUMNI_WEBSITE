// ContactPage.jsx
import './contact.css';
import contacts from '../../data/contacts.json';
import { FaPhoneAlt, FaLinkedin, FaUserTie } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import PropTypes from 'prop-types';

const ContactCard = ({ person, index = 0 }) => {
  return (
    <div className="contact-card">
      <div className="card-image">
        {person.image ? (
          <img src={person.image} alt={person.name} loading={index < 6 ? "eager" : "lazy"} />
        ) : (
          <div className="default-avatar">
            <FaUserTie />
          </div>
        )}
      </div>
      <div className="card-content">
        <h3>{person.name}</h3>
        <p className="title">{person.title}</p>
        {person.department && <p className="department">{person.department}</p>}
        {person.role && <p className="role">{person.role}</p>}
        {person.address && <p className="address">{person.address}</p>}
        
        <div className="contact-links">
          {person.email && (
            <a href={`mailto:${person.email}`} className="contact-link email-link">
              <FiMail className="contact-icon" />
              <span>{person.email}</span>
            </a>
          )}
          {person.phone && (
            <p className="contact-info">
              <FaPhoneAlt className="contact-icon" />
              <span>{person.phone}</span>
            </p>
          )}
          {person.mobile && (
            <p className="contact-info">
              <FaPhoneAlt className="contact-icon" />
              <span>{person.mobile}</span>
            </p>
          )}
          {person.linkedin && (
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link linkedin-link">
              <FaLinkedin className="contact-icon" />
              <span> LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  person: PropTypes.shape({
    name: String,
    title: String,
    department: String,
    role: String,
    address: String,
    email: String,
    phone: String,
    mobile: String,
    linkedin: String,
    image: String,
  }),
  index: Number,
};

const ContactPage = () => {
  return (
    <div>
      {/* Faculty / Office Address */}
      <div className="contact-section">
        <h1 className="section-title">Office Representatives</h1>

        <div className="contact-cards">
          {contacts.faculty.map((person, idx) => (
            <ContactCard key={idx} person={person} index={idx} />
          ))}
        </div>
      </div>

      {/* Student Team (Head + Core) */}
      <div className="contact-section">
        <h1 className="section-title">Student Team</h1>
        <div className="contact-cards">
          {contacts.studentHead.map((person, idx) => (
            <ContactCard key={idx} person={person} index={idx} />
          ))}
          {contacts.coreTeam.map((person, idx) => (
            <ContactCard key={idx} person={person} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;