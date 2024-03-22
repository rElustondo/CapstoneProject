// LandingPage.js

import React, { useState, useEffect } from 'react';
import { ref, onValue,getDatabase  } from "firebase/database";

import './LandingPage.css'; 
import { Link, Navigate } from 'react-router-dom';

const services = [
  {
    title: 'Snow Shoveling',
    providers: [
      { name: 'John Doe', avatar: 'avatar1.png', rate: '$20' },
      { name: 'Jane Smith', avatar: 'avatar2.png', rate: '$22' },
      { name: 'Michael Johnson', avatar: 'avatar3.png', rate: '$18' },
      { name: 'Emily Brown', avatar: 'avatar4.png', rate: '$21' },
      { name: 'William Jones', avatar: 'avatar5.png', rate: '$19' },
      { name: 'Olivia Davis', avatar: 'avatar6.png', rate: '$23' },
      { name: 'Liam Miller', avatar: 'avatar7.png', rate: '$20' },
      { name: 'Emma Wilson', avatar: 'avatar8.png', rate: '$24' },
      { name: 'Noah Moore', avatar: 'avatar9.png', rate: '$17' },
      
    ],
  },
  {
    title: 'Landscaping',
    providers: [
    
      
      
    ],
  },
  {
    title: 'Garderning',
    providers: [
      
      
    ],
  },
  {
    title: 'Driveway Sealing',
    providers: [
      
    ],
  },
];

const ProviderCard = (prop) => {
  console.log(prop,"zain2")
  return(
  <div className="provider-card">
    <img src={`https://i.pravatar.cc/150?img=${prop.img}`} key={prop.contractorData.name} />
    {/* <img src={avatar} alt={name} className="provider-avatar" /> */}
    <h3 className="provider-name">{prop.contractorData.name}</h3>
    <p className="provider-rate">{prop.contractorData.basicPrice} per hour</p>
    <a href={`/PricingPage/${prop.id}/${prop.img}`} className="booking-button">Booking</a>
  </div>
);}


const ServiceSection = (prop) => {
  console.log(prop,"zain")
  return (
  <div className="service-section">
    <div className="service-header">
      <h2 className="service-title">{prop.service.title}</h2>
    </div>
    <div className="provider-list">
      {prop.providers&&prop.providers.filter(f=>f.contractorData).map((provider, index) => (
        <ProviderCard img={provider.imgId?provider.imgId:index} key={index} id={provider.userId} contractorData={provider.contractorData} />
      ))}
    </div>
  </div>
);}

const NavigationBar = () => (
  <nav className="navigation-bar">
    <Link to="/Aboutus">Aboutus</Link>
    <Link to='/faq'>FAQ</Link>
    <Link to='/login'>Login</Link>
  </nav>
);


const Footer = () => (
  <footer className="footer">
    <div className="slogan">YOUR PROPERTY, OUR COMMITMENT</div>
  </footer>
);

const LandingPage = () => {
  const user = JSON.parse(localStorage.getItem("user-capstone"))
  const [usersDataFromDatabase,setUsersDataFromDatabase] = useState(null)
//get data for user
const db = getDatabase()
useEffect(()=>{
  const userDataFromDatabaseRef = ref(db, 'users/');
  onValue(userDataFromDatabaseRef, (snapshot) => {
      const data = snapshot.val();
      debugger
      setUsersDataFromDatabase(data);
  });
},[])

const values =  usersDataFromDatabase&&Object.keys(usersDataFromDatabase).map(key => usersDataFromDatabase[key]);
console.log(usersDataFromDatabase)
  return (
  <div className="landing-page">
    <NavigationBar />
    <main className="main-content">
      {services&&services.map((service, index) => (
        <ServiceSection key={index} service={service} providers={values} />
      ))}
    </main>
    <Footer />
  </div>
);
}

export default LandingPage;
