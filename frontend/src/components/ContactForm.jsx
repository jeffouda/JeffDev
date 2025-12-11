import React, { useState } from 'react';
import './ContactForm.css'; // Import the styles we just made

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  // Handle typing in the input boxes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle clicking "Send"
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://127.0.0.1:8000/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus('error');
    }
  };

  return (
    <div className="contact-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input 
            type="text" 
            name="name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea 
            name="message"
            className="form-textarea"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="I'd like to hire you..."
          ></textarea>
        </div>

        <button type="submit" className="submit-btn" disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && <p className="status-msg" style={{color: '#4ade80'}}>Message sent successfully! 🚀</p>}
        {status === 'error' && <p className="status-msg" style={{color: '#f87171'}}>Something went wrong. Try again.</p>}
      </form>
    </div>
  );
}

export default ContactForm;