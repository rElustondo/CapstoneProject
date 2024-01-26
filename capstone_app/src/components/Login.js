import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  function loginAccount(){
    signInWithEmailAndPassword(window.auth, username, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem("user-capstone", JSON.stringify(user));
        setLoggedIn(true)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  const user = JSON.parse(localStorage.getItem("user-capstone"))

  return (
    <div>
    <h1>Login</h1>
    <label>email</label>
    <input type='text' onChange={e=>setUsername(e.target.value)}/>
    <label>password</label>
    <input type='text' onChange={e=>setPassword(e.target.value)}/>
    <button onClick={loginAccount}>login to account</button>
    <Link to="/sign-up">sign up</Link>
    <Link to="/">Home</Link>
    { loggedIn && <Navigate to="/user-login"/>}
    { user && <Navigate to="/user-login"/>}
</div>
  )
}
