import React, { useState } from 'react';
import '../PaymentForm.css'; // Make sure to create a CSS file with this name

import { getDatabase, ref, set } from "firebase/database";
import { Link } from 'react-router-dom';

export default function PaymentForm() {
  const [formData, setFormData] = useState({
    card_number: '',
    expiry: '',
    cvv: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData( {...formData,[name]:value}
    );
  };

  const handleSubmit = (e) => {

    // Use formData for further processing
    writeUserData()
    console.log(formData);
  };

  const db = getDatabase()
  let userData = JSON.parse(localStorage.getItem("user-capstone"))
const userDataFromDatabaseRef = ref(db, 'users/' + userData.uid+ '/payment-details');

function writeUserData(ca, name, email, imageUrl) {
  const db = getDatabase();
  set(userDataFromDatabaseRef, formData);
}
  return (
    
      <div className="payment-form">
        <div className="header">
          <h2>Enter your Payment Details</h2>
          <a href="/" className="home-button">Home</a>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input name="card_number" onChange={handleChange} type="text" id="cardNumber" placeholder="Card Number"/>
          </div>
          <div className="input-group">
            <label htmlFor="expiry">Expiry</label>
            <input name="expiry" onChange={handleChange} type="text" id="expiry" placeholder="mm/yy"/>
          </div>
          <div className="input-group">
            <label htmlFor="cvv">CVV</label>
            <input name="cvv" onChange={handleChange} type="text" id="cvv" placeholder="CVV"/>
          </div>
          <div className="address-group">
            <label>ADDRESS</label>
            <input name="city" onChange={handleChange} type="text" placeholder="City" />
            <input name="state" onChange={handleChange} type="text" placeholder="State" />
            <input name="zipCode" onChange={handleChange} type="text" placeholder="Zip Code" />
          </div>
          <div style={{    marginLeft: "43%"}}>
          <Link to="/profile" onClick={handleSubmit}>
              Submit
            
          </Link>
          </div>
          
        </form>
      </div>
    );
  
}

// class PaymentForm extends React.Component {
//   let userData = JSON.parse(localStorage.getItem("user-capstone"))
// const userDataFromDatabaseRef = ref(db, 'users/' + userData.uid+ '/payment-details');

// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(userDataFromDatabaseRef, {
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   });
// }
//   render() {

//     return (
//       <div className="payment-form">
//         <div className="header">
//           <h2>Enter your Payment Details</h2>
//           <a href="/" className="home-button">Home</a>
//         </div>
//         <form>
//           <div className="input-group">
//             <label htmlFor="cardNumber">Card Number</label>
//             <input type="text" id="cardNumber" placeholder="Card Number"/>
//           </div>
//           <div className="input-group">
//             <label htmlFor="expiry">Expiry</label>
//             <input type="text" id="expiry" placeholder="mm/yy"/>
//           </div>
//           <div className="input-group">
//             <label htmlFor="cvv">CVV</label>
//             <input type="text" id="cvv" placeholder="CVV"/>
//           </div>
//           <div className="address-group">
//             <label>ADDRESS</label>
//             <input type="text" placeholder="City" />
//             <input type="text" placeholder="State" />
//             <input type="text" placeholder="Zip Code" />
//           </div>
//           <button type="submit">Submit</button>
//         </form>
//       </div>
//     );
  
//   }
// }

//export default PaymentForm;