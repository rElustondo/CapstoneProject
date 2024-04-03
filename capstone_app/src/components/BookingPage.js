import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingPage.css';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

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
  const db = getDatabase(); // Initialize Firebase database
  const clientID = JSON.parse(localStorage.getItem("user-capstone"))?.uid;
  
  
  let { userId,price } = useParams();
  const [contractorData,setContractorData] = useState(null)
  const [discription,setDiscription] = useState(null)

  const [clientData,setClientData] = useState(null)
  
  const [bookingData,setBookingData] = useState(null)


  useEffect(()=>{
    const userDataFromDatabaseRef = ref(db, 'users/' + userId);
    const clientDataFromDatabaseRef = ref(db, 'users/' + clientID);
    const bookingsDataFromDatabaseRef = ref(db, 'bookings/');

    onValue(userDataFromDatabaseRef, (snapshot) => {
        const data = snapshot.val();
        debugger
        setContractorData(data);
    });
    onValue(clientDataFromDatabaseRef, (snapshot) => {
      const data = snapshot.val();
      debugger
      setClientData(data);
    });
    onValue(bookingsDataFromDatabaseRef, (snapshot) => {
      const data = snapshot.val();
      debugger
      setBookingData(Object.values(data));
    });
  },[])
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

  const handleBookingConfirm = (contractorData, price) => {
   debugger
    if (selectedService=="Snow Shoveling"&& !contractorData.contractorData.specialties.snowShoveling){
      alert("contractor Doesn't do snow Shoveling")
      return
    }
    if (selectedService=="Landscaping"&& !contractorData.contractorData.specialties.landscaping){
      alert("contractor Doesn't do Landscaping")
      return
    }
    if (selectedService=="Gardening"&& !contractorData.contractorData.specialties.gardening){
      alert("contractor Doesn't do Gardening")
      return
    }
    if (selectedService=="Driveway Sealing"&& !contractorData.contractorData.specialties.drivewaySealing){
      alert("contractor Doesn't do Driveway Sealing")
      return
    }
    let bookingExists = false;
    bookingData.forEach((booking)=>{
      let x = new Date(booking.booking_time)
      let y = new Date(selectedDate.toISOString())
      debugger
      if(booking.contractorId == contractorData.userId && x.toDateString() == y.toDateString()){
        bookingExists = true;
      }
    })
    if(bookingExists){
      alert("contractor is already booked for that day")
      return
    }
    // Push booking data to Firebase Realtime Database
    const bookingsRef = ref(db, 'bookings');
    const newBookingRef = push(bookingsRef);
    console.log('New Booking Reference:', newBookingRef); // Log to inspect the object

    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(8, 0, 0, 0); // Set the time to 8 AM

    const selectedDateTime2 = new Date(selectedDate);
    selectedDateTime2.setHours(16, 0, 0, 0); // Set the time to 4 PM
  
    // Use set function to save data
    set(newBookingRef, {
      service: selectedService, contractorId:contractorData.userId,
      clientId: clientID, 
      client_address: clientData.clientData.address,
      bookingId:newBookingRef.key,
      price_per_hour:price,
      booking_time: selectedDateTime.toISOString(),
      end_time: selectedDateTime2.toISOString(),
      description: discription,
      date: selectedDate.toISOString(), // Store date in ISO format
    });
    
  
    // Confirmation message
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
      setDiscription
      <input type="text" onChange={e=>setDiscription(e.target.value)}></input>
      <button className="confirm-button" onClick={()=>handleBookingConfirm(contractorData,price)}>
        Confirm Booking
      </button>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default BookingPage;
