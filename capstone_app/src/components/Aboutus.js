import React from 'react';
import { NavLink } from 'react-router-dom';
import aboutUsImage from '../Image/aboutusImages.png';
import '../css/AboutUs.css';

export default function AboutUs() {
  return (
    <div className="about-us-wrapper">
      <header className="header">
        <nav className="navbar">
          <NavLink to="/" exact className="nav-link" activeClassName="active-link">Home</NavLink>
          <NavLink to="Service" className="nav-link" activeClassName="active-link">Services</NavLink>
          <NavLink to="/login" className="nav-link" activeClassName="active-link">Login</NavLink>
          <NavLink to="/sign-up" className="nav-link" activeClassName="active-link">Sign Up</NavLink>
        </nav>
      </header>

      <main className="main-content">
        <section className="about-section">
          <img src={aboutUsImage} alt="About Us" className="about-image" />
          <div className="about-text">
            <h1>Connecting You to Nature’s Best – One Gardener at a Time</h1>
            <p>Welcome to the Outdoor Property Maintenance Web App, the innovative platform where passionate gardeners and discerning homeowners meet to create beautiful outdoor spaces. Our mission is to provide a seamless connection between gardening experts and those who aspire to beautify their outdoor living areas. From landscaping advice to plant care, we're here to support your green thumb journey.</p>
          </div>
        </section>

        <section className="vision-and-services">
          <h2 class="section-heading">Our Vision</h2>
          <p>We believe in the power of green spaces to transform lives and communities. Our vision is to cultivate a world where everyone can experience the joy and well-being that comes from connecting with nature.</p>

          <h2 class="section-heading">Our Services</h2>
          <ul>
            <li>Expert Gardening Advice</li>
            <li>Personalized Landscape Design</li>
            <li>Plant Health and Maintenance Guides</li>
            <li>Community Workshops and Events</li>
          </ul>
        </section>

        <section className="contact-section">
          <h2 class="section-heading">Contact Us</h2>
          <div className="contact-item">
            <strong>Email:</strong> <a href="mailto:support@outdoorapp.com">support@outdoorapp.com</a>
          </div>
          <div className="contact-item">
            <strong>Phone:</strong> <a href="tel:+1234567890">(123) 456-7890</a>
          </div>
          <div className="contact-item">
            <strong>Address:</strong> 123 Greenway Dr, Gardenville, GA
          </div>
          <div className="contact-item social-media-links">
            <a href="http://facebook.com">Facebook</a>
            <a href="http://twitter.com">Twitter</a>
            <a href="http://instagram.com">Instagram</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        {/* Footer content here */}
      </footer>
    </div>
  );
}
