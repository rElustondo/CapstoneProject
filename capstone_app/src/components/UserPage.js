import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function UserPage() {
    const [loggedOut,setLoggedOut] = useState(false)
    function logOut(){
      localStorage.removeItem("user-capstone")
      setLoggedOut(true)
    }
    let userData = JSON.parse(localStorage.getItem("user-capstone"))
    console.log(userData)
  return (
    <div>
        <h1>UserPage</h1>
        {loggedOut && <Navigate to="/login"/>}
        { userData == null  && <Navigate to="/"/>}
        welcome {userData&& userData.email}
        <Button onClick={logOut}>Log out</Button>
    </div>
  )
}

