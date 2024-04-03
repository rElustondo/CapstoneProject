import { Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ref, onValue,getDatabase, set  } from "firebase/database";
import { Paper, Typography } from '@mui/material';
import './AdminDashboard.css'; // Import CSS file for styling

// Components for the parts of the dashboard
const Navbar = () => (
  <div className="navbar">
    <Link to="/">Home</Link>
    <Link to="/settings">Settings</Link>
    <Link to="/profile">Profile</Link>
  </div>
);

const ResponseInput = ({user}) => {
  const [response,setResponse] = useState("")
  const db = getDatabase()
 const handleResponse = (e) => {
  setResponse(e.target.value)
 }
 const handleReply = () => {
  set(ref(db, 'users/' + user.userId + "/contact_and_support/reponse"), response);
 }
  return ( 
  <div >
    <input type='text' onChange={handleResponse}></input>
    <button onClick={handleReply}>Reply</button>
  </div>
)};

const MainContent = ({userDataFromDatabase}) => (
  <div className="main-content">
    <h2>Support Messages</h2>
    {userDataFromDatabase && userDataFromDatabase.filter(user=>user.contact_and_support).map((user, index)=>{
return <div><Paper  style={{margin:"20px", width:"300px"}} key={index} >
<Typography variant="h6">User Details</Typography>
<div>
  <Typography >
    <strong>Name:</strong> {user.contact_and_support.name}
  </Typography>
  <Typography >
    <strong>Message:</strong> {user.contact_and_support.message}
  </Typography>
  <Typography>
    <strong>Email:</strong> {user.contact_and_support.email}
  </Typography>
  <Typography>
    <strong>Response:</strong> {user.contact_and_support.reponse}
  </Typography>
</div>
</Paper>
<ResponseInput user={user}></ResponseInput>
</div>
}) }
    {/* <Routes>
      <Route path="/" exact>
        Dashboard Home
      </Route>
      <Route path="/contact_and_support">
        ContactUS
      </Route>
      <Route path="/users">
        Users List
      </Route>
      <Route path="/orders">
        Orders List
      </Route>
      <Route path="/settings">
        Settings
      </Route>
      <Route path="/profile">
        User Profile
      </Route>
      <Route>
        404 Not Found
      </Route>
    </Routes> */}
  </div>
);

const Footer = () => (
  <div className="footer">
    © 2024 Dashboard, Inc.
  </div>
);

const AdminDashboard = () => {

  const [userDataFromDatabase,setUserDataFromDatabase] = useState(null)
  const db = getDatabase()

  useEffect(()=>{
    const userDataFromDatabaseRef = ref(db, 'users/');
    onValue(userDataFromDatabaseRef, (snapshot) => {
        const data = snapshot.val();
        debugger
        setUserDataFromDatabase(Object.values(data));
    });
},[])
console.log("user data from database", userDataFromDatabase)

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-main">
      
        <MainContent userDataFromDatabase={userDataFromDatabase} />
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
