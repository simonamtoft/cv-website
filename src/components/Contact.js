import React from 'react';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <div className="contact">
      <h2>Reach Out!</h2>
      <p>
        AI and machine learning are evolving fast, and the best ideas come from collaboration.
        Whether you're exploring AI-driven solutions, wanting to participate in next year's Driving AI event, or just want to chat
        about the future of data science, I'd love to hear from you!
      </p>
      <div className="contact-info">
        <p>
          📩 Email: <a href="mailto:simon@amtoft.dev">simon@amtoft.dev</a>
        </p>
        <p>
          🔗 LinkedIn: <a href="https://linkedin.com/in/simonamtoft" target="_blank" rel="noopener noreferrer">simonamtoft</a>
        </p>
      </div>
      <p>
        Let's connect and build something exciting together!
      </p>
    </div>
  );
};

export default Contact;