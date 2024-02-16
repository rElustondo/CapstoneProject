import React from 'react';
import { Link } from 'react-router-dom';
import aboutUsImage from '../Image/aboutusImages.png';
import '../css/AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-us-wrapper">
      <aside className="sidebar">
        <Link to="/" className="btn">Home</Link>
        <Link to="Service" className="btn">Service</Link>
        <Link to="/login" className="btn">Login</Link>
        <Link to="/sign-up" className="btn">Sign Up</Link>
      </aside>

      <div className="about-us-container">
        <img src={aboutUsImage} alt="About Us" className="about-us-image" />

        <div className="about-us-content">
          <h1>Connecting You to Nature’s Best – One Gardener at a Time</h1>
          <p>Welcome to the Outdoor Property Maintenance Web App, the innovative platform where passionate gardeners and discerning homeowners meet to create beautiful outdoor spaces. Our mission is to provide a seamless connection between gardening experts and those who aspire to beautify their outdoor living areas. From landscaping advice to plant care, we're here to support your green thumb journey.</p>
          <h3>Our Vision</h3>
          <p>We believe in the power of green spaces to transform lives and communities. Our vision is to cultivate a world where everyone can experience the joy and well-being that comes from connecting with nature.</p>
          <h3>Our Services</h3>
          <ul>
            <li>Expert Gardening Advice</li>
            <li>Personalized Landscape Design</li>
            <li>Plant Health and Maintenance Guides</li>
            <li>Community Workshops and Events</li>
          </ul>
        </div>

        <div className="contact-section">
          <h2>Contact Us</h2>
          <p>For support or inquiries, please visit our Support Page or reach out to us through the following channels:</p>
          <ul>
            <li>Email: <a href="mailto:support@outdoorapp.com">support@outdoorapp.com</a></li>
            <li>Phone: <a href="tel:+1234567890">(123) 456-7890</a></li>
            <li>Address: 123 Greenway Dr, Gardenville, GA</li>
          </ul>
          <p>Stay connected with us on social media:</p>
          <div className="social-media-links">
            {/* Icons or text links to social media here */}
            <a href="http://facebook.com" className="social-link">Facebook</a>
            <a href="http://twitter.com" className="social-link">Twitter</a>
            <a href="http://instagram.com" className="social-link">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}
