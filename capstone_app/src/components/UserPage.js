
import React,  { useState, useEffect }  from 'react'
import { Home as HomeIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Link, Navigate } from 'react-router-dom'
import { ref, onValue,getDatabase  } from "firebase/database";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Container} from '@mui/material';
export default function UserPage() {

    const db = getDatabase()
    const [loggedOut,setLoggedOut] = useState(false)
    const [userDataFromDatabase,setUserDataFromDatabase] = useState(null)

    function logOut(){
      localStorage.removeItem("user-capstone")
      setLoggedOut(true)
    }
    let userData = JSON.parse(localStorage.getItem("user-capstone"))
    console.log(userData)

    //get data for user
    useEffect(()=>{
        const userDataFromDatabaseRef = ref(db, 'users/' + userData.uid);
        onValue(userDataFromDatabaseRef, (snapshot) => {
            const data = snapshot.val();
            debugger
            setUserDataFromDatabase(data);
        });
    },[])
    if(userDataFromDatabase == null) return 'please pick another user, one that is in the databse'
  return (
    <React.Fragment>
        <Box sx={{ flexGrow: 1 }}>
            {loggedOut && <Navigate to="/login"/>}
            { userData == null  && <Navigate to="/"/>}
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="Profile Settings">
                <Link to="/profile"><AccountCircleIcon/></Link>
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                Dashboard
              </Typography>
              <Button color="inherit" onClick={logOut}>Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Container>
          <h1>{userDataFromDatabase.contractorData == null ? "User" : "Contractor"} Dashboard</h1>
          {loggedOut && <Navigate to="/login"/>}
          { userData == null  && <Navigate to="/"/>}
          welcome {userData&& userData.email}
        </Container>
        <Link to='/contact_and_support'>contact and support</Link>
    </React.Fragment>
  )
}

