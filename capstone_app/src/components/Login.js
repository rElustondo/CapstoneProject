import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
  
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
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
    <div>
      <Typography component="h1" variant="h5">
        Login
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
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={loginAccount}
        sx={{ mt: 2, mb: 2 }}
      >
        Login to Account
      </Button>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Link to="/sign-up">Sign Up</Link>
        </Grid>
        <Grid item>
          <Link to="/">Home</Link>
        </Grid>
      </Grid>
      {loggedIn && <Navigate to="/user-login" />}
      { user && <Navigate to="/user-login"/>}
    </div>
  </Container>

  )
}
