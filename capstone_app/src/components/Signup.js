import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

export default function  Signup() {
  const db = getDatabase()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isContractor, setIsContractor] = useState("")
  const [contractorData, setContractorData] = useState({
    name:"",
    phone:"",
    location:"",
    basicPrice:15,
    specialties: {
      snowShoveling: false,
      landscaping: false,
      gardening: false,
      drivewaySealing: false
    }
  })
  const [clientData, setClientData] = useState({
    name:"",
    phone:"",
    address:""
  })
  const [loggedIn, setLoggedIn] = useState(false)
  const user = JSON.parse(localStorage.getItem("user-capstone"))
  const containerHeight = isContractor ? 'auto' : '100vh';

  function createAccount(){
    createUserWithEmailAndPassword(window.auth, username, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        localStorage.setItem("user-capstone", JSON.stringify(user));
        writeUserData(user.uid)
        setLoggedIn(true)
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        // ..
      });
  }
  function writeUserData(userId) {
    if(isContractor){
      set(ref(db, 'users/' + userId), {
        email:username,
        contractorData,
        userId,
        imgId: Math.floor(Math.random() * 71)
      });
    }
    else{
      set(ref(db, 'users/' + userId), {
        email:username,
        clientData,
        userId,
        imgId: Math.floor(Math.random() * 71)
      });
    }
  }
  function clientInputs(){
    return <div>
    <TextField
          margin="normal"
          fullWidth
          label="Full Name"
          type="text"
          onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Phone Number"
          type="text"
          onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Address"
          type="text"
          onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
        />
    </div>
  }
  function isAContractor(){
    return (
      <div>
        <TextField
          margin="normal"
          fullWidth
          label="Full Name"
          type="text"
          onChange={(e) => setContractorData({ ...contractorData, name: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Phone Number"
          type="text"
          onChange={(e) => setContractorData({ ...contractorData, phone: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Location"
          type="text"
          onChange={(e) => setContractorData({ ...contractorData, location: e.target.value })}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Price per hour"
          type="number"
          defaultValue={contractorData.basicPrice}
          onChange={(e) => setContractorData({ ...contractorData, basicPrice: e.target.value })}
        />
        <div>
          <Typography variant="body1">
            Please Select Specialties
          </Typography>
          <div>
            <span>Snow Shoveling</span>
            <input type='checkbox' onChange={(e) => setContractorData({ ...contractorData, specialties: { ...contractorData.specialties, snowShoveling: e.target.checked } })} />
          </div>
          <div>
            <span>Landscaping</span>
            <input type='checkbox' onChange={(e) => setContractorData({ ...contractorData, specialties: { ...contractorData.specialties, landscaping: e.target.checked } })} />
          </div>
          <div>
            <span>Gardening</span>
            <input type='checkbox' onChange={(e) => setContractorData({ ...contractorData, specialties: { ...contractorData.specialties, gardening: e.target.checked } })} />
          </div>
          <div>
            <span>Driveway Sealing</span>
            <input type='checkbox' onChange={(e) => setContractorData({ ...contractorData, specialties: { ...contractorData.specialties, drivewaySealing: e.target.checked } })} />
          </div>
        </div>
      </div>
    )
  }
  return (

    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: containerHeight }}>
    <div>
      <Typography component="h1" variant="h5">
        Signup
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        label="Email"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
     
      <div>
        <Typography variant="body1">
          You are a contractor
        </Typography>
        <input type='checkbox' onChange={e => setIsContractor(e.target.checked)} />
        {isContractor ? isAContractor(): clientInputs()}
      </div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={createAccount}
        sx={{ mt: 2, mb: 2 }}
      >
        Create Account
      </Button> 
      <Grid container justifyContent="space-between">
        <Grid item>
          <Link to="/login">Login</Link>
        </Grid>
        <Grid item>
          <Link to="/admin-sign-up">Admin Sign Up</Link>
        </Grid>
        <Grid item>
          <Link to="/">Home</Link>
        </Grid>
      </Grid>
      {loggedIn && <Navigate to="/user-login" />}
    </div>
    { user && <Navigate to="/user-login"/>}
  </Container>

  )
}
