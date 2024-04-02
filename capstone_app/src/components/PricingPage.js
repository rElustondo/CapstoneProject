import React, { useState, useEffect } from 'react';
import { ref, onValue,getDatabase  } from "firebase/database";
import { useParams } from 'react-router-dom';
import './PricingPage.css';

const Navbar = () => (
  <nav className="navbar">
    <a href="/" className="nav-link">Home</a>
    <a href="/faq" className="nav-link">FAQ</a>
    <a href="/Aboutus" className="nav-link">About</a>
    <a href="/login" className="nav-link">Login</a>
  </nav>
);

const ContactCard = ({ name, contact, img }) => (
  <div className="contact-card">
    <img src={`https://i.pravatar.cc/150?img=${img}`} alt="Avatar" className="avatar"/>
    <div className="contact-details">
      <p className="contact-name">{name}</p>
      <p className="contact-number">{contact}</p>
      <p className="contact-stars">*****</p>
    </div>
  </div>
);

const PricingOption = ({ title, features, price, contractorData }) => (
  <div className="pricing-option">
    <h3>{title}</h3>
    <ul className="features-list">
      {features.map((feature, index) => <li key={index}>{feature}</li>)}
    </ul>
    <p className="price">{price}/per hour</p>
    <a href={`/BookingPage/${contractorData&&contractorData.userId}/${price}`} className="select-button">Select</a>
  </div>
);

const PricingPage = (prop) => {
  const featuresBasic = ['Feature A', 'Feature B', 'Feature C'];
  const featuresPlus = ['Feature A', 'Feature B', 'Feature C', 'Feature D'];
  const featuresPro = ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'];

  let { userId,imgId } = useParams();
  const [usersDataFromDatabase,setUsersDataFromDatabase] = useState(null)
  //get data for user
  const db = getDatabase()
  useEffect(()=>{
    const userDataFromDatabaseRef = ref(db, 'users/' + userId);
    onValue(userDataFromDatabaseRef, (snapshot) => {
        const data = snapshot.val();
        debugger
        setUsersDataFromDatabase(data);
    });
  },[])
console.log("zain3",usersDataFromDatabase)
let price = usersDataFromDatabase&&usersDataFromDatabase.contractorData&&usersDataFromDatabase.contractorData.basicPrice

  return usersDataFromDatabase&&usersDataFromDatabase.contractorData&&(
    <div className="pricing-page">
      <header className="header">
        <Navbar />
      </header>
      <main className="main-content">
        <section className="contact-section">
          <ContactCard  img={imgId} name={usersDataFromDatabase.contractorData.name} contractorData={usersDataFromDatabase} contact={usersDataFromDatabase.contractorData.phone} />
          <div className="team-info">
            <img src="/path-to-team-logo.png" alt="Team 24 Logo" className="team-logo"/>
            <p className="team-name">Team 24</p>
            <p className="team-motto">YOUR PROPERTY, OUR COMMITMENT</p>
          </div>
        </section>
        <section className="pricing-section">
          <PricingOption title="Basic" features={featuresBasic} price={price} contractorData={usersDataFromDatabase} />
          <PricingOption title="Plus" features={featuresPlus} price={`$${Number(price)+10}`} contractorData={usersDataFromDatabase}/>
          <PricingOption title="Pro" features={featuresPro} price={`$${Number(price)+15}`} contractorData={usersDataFromDatabase}/>
        </section>
      </main>
    </div>
  )
};

export default PricingPage;
