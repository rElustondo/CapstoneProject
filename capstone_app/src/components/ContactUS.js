import React, { useState } from 'react';
import "../ContactUs.css"

import { getDatabase, ref, set } from "firebase/database";



function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const db = getDatabase();
  let userData = JSON.parse(localStorage.getItem("user-capstone"))
  const userDataFromDatabaseRef = ref(db, 'users/' + userData.uid+ '/contact_and_support');
  
  function writeUserData(userId, name, email, imageUrl) {
    const db = getDatabase();
    set(userDataFromDatabaseRef, formData);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the form data to a server
    console.log(formData);
    alert('Thank you for your message. We will get back to you shortly.');
   writeUserData()
  };

  return (
    <div className="contact-form-container">
      <div className="contact-info">
        <h3>Send us a message</h3>
        <p>If you have any work or any types of queries related to our work, you can send us a message from here. It's our pleasure to help you!</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message"
          required
        />
        <button type="submit">Send Now</button>
      </form>
    </div>
  );
}

export default ContactUs;