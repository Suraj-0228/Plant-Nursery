import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [inquiry, setInquiry] = useState('General');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your message, ${name}! We will get back to you shortly.`);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input 
          type="text" 
          placeholder="Your Name" 
          className="input input-bordered" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input 
          type="email" 
          placeholder="Your Email" 
          className="input input-bordered" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Inquiry Type</span>
        </label>
        <select 
          className="select select-bordered" 
          value={inquiry} 
          onChange={(e) => setInquiry(e.target.value)}
        >
          <option>General</option>
          <option>Order Support</option>
          <option>Plant Care</option>
        </select>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Message</span>
        </label>
        <textarea 
          className="textarea textarea-bordered h-24" 
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary">Send Message</button>
      </div>
    </form>
  );
};

export default ContactForm;
