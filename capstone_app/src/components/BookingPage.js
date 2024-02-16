import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingPage.css';
import { Link } from 'react-router-dom';

// ServiceButton component for individual service selection
const ServiceButton = ({ service, isSelected, onSelect }) => (
  <button
    className={`service-button ${isSelected ? 'selected' : ''}`}
    onClick={() => onSelect(service)}
  >
    {service}
  </button>
);

// ServiceList component for listing services
const ServiceList = ({ services, selectedService, onSelectService }) => (
  <div className="service-list">
    <h2>Select a Service:</h2>
    {services.map((service) => (
      <ServiceButton
        key={service}
        service={service}
        isSelected={selectedService === service}
        onSelect={onSelectService}
      />
    ))}
  </div>
);

// BookingPage component
const BookingPage = () => {
  const [services] = useState([
    'Snow Shoveling',
    'Landscaping',
    'Gardening',
    'Driveway Sealing',
  ]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleBookingConfirm = () => {
    // Here you would typically send the booking data to a backend server
    alert(`Booking confirmed for ${selectedService} on ${selectedDate.toDateString()}`);
  };

  return (
    <div className="booking-page">
      <ServiceList
        services={services}
        selectedService={selectedService}
        onSelectService={handleServiceSelect}
      />
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          // Customize calendar props as needed
        />
      </div>
      <Link to="/login">
        <button className="confirm-button" onClick={handleBookingConfirm}>
          Confirm Booking
        </button>
      </Link>
    </div>
  );
};

export default BookingPage;
