
import React,  { useState, useEffect }  from 'react'
import { Home as HomeIcon, AccountCircle as AccountCircleIcon, FunctionsOutlined, Dashboard } from '@mui/icons-material';
import { Link, Navigate } from 'react-router-dom'
import { ref, onValue,getDatabase, set  } from "firebase/database";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Container} from '@mui/material';
import ContractorDashboard from './ContractorDashboard';
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
    function dashboard( ){
      return (<ContractorDashboard userDataFromDatabase={userDataFromDatabase}/>)
      // return (<div><input type='text' value={contractorData.name}></input></div>)
    }
    function clientDashboard( ){
      return (<div>
        <h1>Client Dashboard</h1>
      </div>)
    }
    function adminDashboard( ){
      return (<div>
        <h1>Admin Dashboard</h1>
      </div>)
    }
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
          Welcome {userData&& userData.email}!
          {userDataFromDatabase.clientData ? clientDashboard() :userDataFromDatabase.contractorData?dashboard():userDataFromDatabase.adminData&&adminDashboard()}
          {loggedOut && <Navigate to="/login"/>}
          { userData == null  && <Navigate to="/"/>}
        </Container>
        <Link to="/contact_and_support"> Contact US</Link>
    </React.Fragment>
  )
}

