import React from 'react'
import { Navigate } from 'react-router-dom'

export default function UserPage() {
    const user = JSON.parse(localStorage.getItem("user-capstone"))

  return (
    <div>
        <h1>UserPage</h1>
        { !user && <Navigate to="/"/>}
        welcome {user.email}
    </div>
  )
}
