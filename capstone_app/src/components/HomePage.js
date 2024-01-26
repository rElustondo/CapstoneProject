import React from 'react'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user-capstone"))

  return (
    <div>
        <h1>HomePage</h1>
        <Link to="/login">login</Link>
        { user && <Navigate to="/user-login"/>}
        
    </div>
  )
}
