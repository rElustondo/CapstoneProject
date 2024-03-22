import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@mui/material';


export default function ClientDashboard() {
    const db = getDatabase();
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user-capstone"))?.uid;
    const bookingData = {
        "bookings": [
          {
            "booking_id": 1,
            "contractor_id": 101,
            "client_id": 201,
            "client_address": "123 Main St, City A",
            "booking_time": "2024-03-22T10:00:00",
            "end_time": "2024-03-22T11:30:00",
            "price_per_hour": 50
          },
          {
            "booking_id": 2,
            "contractor_id": 102,
            "client_id": 201,
            "client_address": "456 Elm St, City B",
            "booking_time": "2024-03-23T14:00:00",
            "end_time": "2024-03-23T16:00:00",
            "price_per_hour": 60
          },
          {
            "booking_id": 3,
            "contractor_id": 103,
            "client_id": 203,
            "client_address": "789 Oak St, City C",
            "booking_time": "2024-03-24T09:30:00",
            "end_time": "2024-03-24T12:00:00",
            "price_per_hour": 55
          },
          {
            "booking_id": 4,
            "contractor_id": 104,
            "client_id": 204,
            "client_address": "987 Pine St, City D",
            "booking_time": "2024-03-25T11:00:00",
            "end_time": "2024-03-25T12:30:00",
            "price_per_hour": 45
          },
          {
            "booking_id": 5,
            "contractor_id": 105,
            "client_id": 205,
            "client_address": "654 Maple St, City E",
            "booking_time": "2024-03-26T08:00:00",
            "end_time": "2024-03-26T09:30:00",
            "price_per_hour": 70
          }
        ]
      }

    useEffect(() => {
        if (userId) {
            const userRef = ref(db, 'users/' + userId);
            const bookingsRef = ref(db, `bookings/${userId}`);
            
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                setUserData(data);
            });

            onValue(bookingsRef, (snapshot) => {
                const data = snapshot.val();
                setBookings(data ? Object.values(data) : []);
            });
        }
    }, [db, userId]);

    if (!userId) {
        return <Navigate to="/login" />;
    }

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>Welcome, {userData?.clientData?.name || 'Client'}</Typography>
            <Box my={4}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Your Bookings</Typography>
                            <List>
                                {bookingData.bookings.length ? bookingData.bookings
        .filter(v => v.client_id === 201)
        .map(booking => (
          <Card key={booking.booking_id} variant="outlined" style={{ marginBottom: '1rem' }}>
            <CardContent>
              <Typography variant="h6">Booking ID: {booking.booking_id}</Typography>
              <Typography>Contractor ID: {booking.contractor_id}</Typography>
              <Typography>Client ID: {booking.client_id}</Typography>
              <Typography>Client Address: {booking.client_address}</Typography>
              <Typography>Price Per Hour: ${booking.price_per_hour}</Typography>
              <Typography>Booking Time: {new Date(booking.booking_time).toLocaleString()}</Typography>
              <Typography>End Time: {new Date(booking.end_time).toLocaleString()}</Typography>
            </CardContent>
          </Card>
        )): <Typography>No bookings found.</Typography>}
                            </List>
                            <Box mt={2}>
                                <Button variant="contained" color="primary" component={Link} to="/">Book New Service</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Account Settings</Typography>
                            <Box display="flex" flexDirection="column" gap={2} mt={1}>
                                <Button variant="contained" component={Link} to="/profile">Manage Account</Button>
                                <Button variant="outlined" component={Link} to="/payment">Payment Details</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Need Help?</Typography>
                            <Box display="flex" flexDirection="column" gap={2} mt={1}>
                                <Button variant="contained" component={Link} to="/faq">FAQ</Button>
                                <Button variant="contained" component={Link} to="/contact_and_support">Contact Support</Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
