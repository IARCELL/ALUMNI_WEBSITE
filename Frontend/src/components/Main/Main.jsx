import { useEffect, useState } from 'react';
import '../Main/Main.css';
import messagesData from '../../data/messages.json';
import TestimonialSlider from './TestimonialSlider';
import MessageWithReadMore from '../MessageWithReadMore/MessageWithReadMore';

function Main() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(messagesData.messages);
  }, []);

  // Function to get card class based on role
  const getCardClass = (role) => {
    if (role === "Director's Message") return 'message-card director-card fade-in';
    if (role === "Dean Students' Message") return 'message-card dean-card fade-in';
    if (role === "Faculty-in-Charge Message") return 'message-card fic-card fade-in';
    return 'message-card fade-in';
  };

  return (
    <>
      <section className="refer1 enhanced-section">
        {messages.map((msg, idx) => (
          <div key={idx} className={getCardClass(msg.role)}>
            <div className="card-header">
              <div className="image-wrapper">
                <img src={msg.image} alt={msg.name} className="DEAN enhanced-img" />
              </div>

              <div className="DirectorMessage">
                <p className="role-text">{msg.role.toUpperCase()}</p>
                <h2 className="name-text">{msg.name}</h2>
                <p className="profession-text">{msg.title}</p>
              </div>
            </div>

            <div className="card-body">
              <MessageWithReadMore 
                paragraphs={msg.paragraphs} 
                role={msg.role} 
              />
            </div>

          </div>
        ))}
      </section>
      <TestimonialSlider />
    </>
  );
}

export default Main;