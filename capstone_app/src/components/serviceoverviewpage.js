import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../Image/work.jpg'; // Make sure this path is correct
import '../css/ServiceOverviewPage.css'; // Assuming this is the correct path to your CSS file

export default function ServiceOverviewPage() {
  return (
    <>
      <header className="top-nav">
        <div className="logo">Outdoor Property Maintenance Web App</div>
        <nav>
          <Link to="/Aboutus/Service">Service Overview</Link>
          <Link to="/aboutus">About</Link>
          <Link to="/sign-up">Sign Up</Link>
          <Link to="/login" className="get-started-btn">Get Started</Link>
        </nav>
      </header>

      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>Our Services</h1>
          <p>Discover the Ease of Professional Gardening Services</p>
          <Link to="/login" className="get-started-btn">Get Started</Link>
        </div>
      </section>

      <section className="services-offered">
        <h2>Main Services Offered:</h2>
        <div className="service">
          <h3>Lawn Care</h3>
          <p>From mowing to fertilization, our experts keep your lawn green and lush.</p>
        </div>
        <div className="service">
          <h3>Garden Maintenance</h3>
          <p>Regular upkeep to ensure your garden thrives in all seasons.</p>
        </div>
        <div className="service">
          <h3>Snow Removal</h3>
          <p>Timely and efficient snow clearing to keep your property safe and accessible.</p>
        </div>
      </section>

      <section className="why-choose-us">
      <h2>Why Choose Us?</h2>
      <ul>
        <li><i className="fas fa-clock"></i> Convenience: Easily browse and book services online according to your schedule.</li>
        <li><i className="fas fa-star"></i> Trust: Read reviews and ratings from other customers to find the best gardener for your needs.</li>
        <li><i className="fas fa-sync-alt"></i> Flexibility: Choose services a la carte or sign up for regular maintenance packages.</li>
      </ul>
    </section>


      <section className="customer-journey">
        <h2>Customer Journey Section:</h2>
        <ol>
          <li>Sign Up: Create your free account today.</li>
          <li>Select Services: Choose from a variety of gardening services.</li>
          <li>Enjoy Your Garden: Sit back and enjoy your beautiful outdoor space.</li>
        </ol>
      </section>

      <footer className="site-footer">
          <div className="footer-content">
            <div>Outdoor Property Maintenance Web App</div>
            <Link to="/Aboutus" className="footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
      </footer>

    </>
  );
}
