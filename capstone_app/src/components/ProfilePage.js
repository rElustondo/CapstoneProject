import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Container,Card, CardContent,CardHeader, Avatar,Grid, Chip  } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { Link, Navigate } from 'react-router-dom';
import { ref, onValue,getDatabase  } from "firebase/database";
import { Phone, LocationOn, MonetizationOn, AccountBalanceWallet,ContactPage } from '@mui/icons-material';

const ProfilePage = () => {
    const db = getDatabase()
    const [loggedOut,setLoggedOut] = useState(false)

    const [userDataFromDatabase,setUserDataFromDatabase] = useState(null)
    

    function logOut(){
      localStorage.removeItem("user-capstone")
      setLoggedOut(true)
    }
    let userData = JSON.parse(localStorage.getItem("user-capstone"))
    useEffect(()=>{
        const userDataFromDatabaseRef = ref(db, 'users/' + userData.uid);
        onValue(userDataFromDatabaseRef, (snapshot) => {
            const data = snapshot.val();
            setUserDataFromDatabase(data);
        });
    },[])
    debugger
    console.log("userDataFromDatabase",userDataFromDatabase)
    
    function clientData(){
      debugger
      let cardEndingWith = userDataFromDatabase["payment-details"] && userDataFromDatabase["payment-details"].card_number.split(" ")[userDataFromDatabase["payment-details"].card_number.split(" ").length-1]
        return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={10} sm={6} md={4}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar src={"https://i.pravatar.cc/300"} />
                }
                title={userDataFromDatabase.clientData.name}
              />
              <CardContent>
                <Typography variant="h3">Profile Details</Typography>
                <Typography variant="h5"><ContactPage/> Name:</Typography>
                <Typography>{userDataFromDatabase.clientData.name}</Typography>
                <Typography variant="h5">
                  <LocationOn /> Address:
                </Typography>
                <Typography>{userDataFromDatabase.clientData.address}</Typography>
                <Typography variant="h5">  
                  <Phone /> Phone:
                </Typography>
                <Typography>{userDataFromDatabase.clientData.phone}</Typography>
                <Typography variant="h5"> <AccountBalanceWallet/> Billing Account:</Typography>
                <Typography> {userDataFromDatabase["payment-details"] == undefined?"Card Ending in 2235":`Card Ending in ${cardEndingWith}`} </Typography>
              </CardContent>
            </Card>
            <div>
              <Link to='/payment'>Payment Settings Page</Link>
            </div>
          </Grid>
      </Grid>
        )
    }
    function contractorData(){
      return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
          <Grid item xs={10} sm={6} md={4}>
            <Card>
              <CardHeader
                avatar={<Avatar src={"https://i.pravatar.cc/300"}/>}
                title={userDataFromDatabase.contractorData.name}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  <MonetizationOn /> Basic Price:
                </Typography>
                <Typography>{`$${userDataFromDatabase.contractorData.basicPrice}`}</Typography>
                <Typography variant="h5" gutterBottom>
                  <LocationOn /> Location:
                </Typography>
                <Typography>{userDataFromDatabase.contractorData.location}</Typography>
                <Typography variant="h5" gutterBottom>
                  <Phone /> Phone:
                </Typography>
                <Typography>{userDataFromDatabase.contractorData.phone}</Typography>
                <Typography variant="h5" gutterBottom>
                  Specialties:
                </Typography>
                {Object.entries(userDataFromDatabase.contractorData.specialties).map(([key, value]) => (
                  <Chip key={key} label={key} color={value ? 'primary' : 'default'} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
        return <p>{JSON.stringify(userDataFromDatabase.contractorData)}</p>
    }

  return (<React.Fragment>
    <Box sx={{ flexGrow: 1 }}>
        {loggedOut && <Navigate to="/login"/>}
        { userData == null  && <Navigate to="/"/>}
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home">
          <Link to="/"><HomeIcon /></Link>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            Profile Settings
          </Typography>
          <Button color="inherit" onClick={logOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Container>
        {userDataFromDatabase&&(userDataFromDatabase.contractorData == null ? clientData() :
         contractorData())}
    

    </Container>
    </React.Fragment>
  );
};

export default ProfilePage;
