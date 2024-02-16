import React from 'react'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
export default function HomePage() {
  const user = JSON.parse(localStorage.getItem("user-capstone"))

  return (
    <div>
        <h1>Landing Page</h1>
        <Link to="/login">login</Link>
        <Link to="/Aboutus">Aboutus</Link>
        <Link to='/faq'>FAQ</Link>
        { user && <Navigate to="/user-login"/>}
    </div>
  )
}
