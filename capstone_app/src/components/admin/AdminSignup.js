import React from 'react'
import { Navigate } from 'react-router-dom'
import { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set, getDatabase } from 'firebase/database';


export default function AdminSignup() {
    const db = getDatabase()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [adminData, setAdminData] = useState({
        name:"",
        phone:"",
        imgId: Math.floor(Math.random() * 71)
      })
    const [loggedIn, setLoggedIn] = useState(false)
    const user = JSON.parse(localStorage.getItem("user-capstone"))
    function createAccount(){
        createUserWithEmailAndPassword(window.auth, username, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            localStorage.setItem("user-capstone", JSON.stringify(user));
            writeAdminData(user.uid)
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
    function writeAdminData(userId) {
        set(ref(db, 'users/' + userId), {
        email:username,
        adminData,
        userId,
        imgId: Math.floor(Math.random() * 71)
        });
      }
  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: 'auto' }}>
        <div>
            <h1>Admin Signup</h1>
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
            <TextField
                margin="normal"
                fullWidth
                label="Full Name"
                type="text"
                onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}/>
            <TextField 
                margin="normal"
                fullWidth
                label="Phone Number"
                type="text"
                onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}/>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={createAccount}
                sx={{ mt: 2, mb: 2 }}
            >
                Create Account
            </Button> 
        </div>
     
        
        {loggedIn && <Navigate to="/user-login" />}
        {user && <Navigate to="/user-login" />}
    </Container>
  )
}
