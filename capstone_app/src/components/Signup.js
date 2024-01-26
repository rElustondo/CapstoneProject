import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';
export default function  Signup() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const user = JSON.parse(localStorage.getItem("user-capstone"))

  function createAccount(){
    createUserWithEmailAndPassword(window.auth, username, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        localStorage.setItem("user-capstone", JSON.stringify(user));
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
        // ..
      });

  }
  return (
    <div>
    <h1>Signup</h1>
    <label>email</label>
    <input type='text' onChange={e=>setUsername(e.target.value)}/>
    <label>password</label>
    <input type='text' onChange={e=>setPassword(e.target.value)}/>
    <button onClick={createAccount}>Create Account</button>
    <Link to="/login">login</Link>
    <Link to="/">Home</Link>
    { user && <Navigate to="/user-login"/>}
</div>
  )
}
