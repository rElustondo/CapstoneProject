import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, Box, Button, Grid, Paper, List, Card, CardContent } from '@mui/material';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Navigate, Link } from 'react-router-dom';
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';

export default function ClientDashboard() {
    const db = getDatabase();
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const userId = JSON.parse(localStorage.getItem("user-capstone"))?.uid;

    useEffect(() => {
        if (userId) {
            const userRef = ref(db, 'users/' + userId);
            const bookingsRef = ref(db, `bookings/${userId}`);

            const handleUserData = (snapshot) => {
                const data = snapshot.val();
                setUserData(data);
            };

            // const handleBookingsData = (snapshot) => {
            //     const data = snapshot.val();
            //     setBookings(data ? Object.values(data) : []);
            // };

            onValue(userRef, handleUserData);
            // onValue(bookingsRef, handleBookingsData);

           
        }const bookingsFromDatabaseRef = ref(db, 'bookings/');
        onValue(bookingsFromDatabaseRef , (snapshot) => {
                   const data = snapshot.val();
                   console.log(data,"123321")
                   setBookings(Object.values(data).filter((booking)=>booking.clientId == userId ));
       });
    }, []);
    

    console.log(bookings, "bookings2");
  
    const user = JSON.parse(localStorage.getItem("user-capstone"));
     

    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (userId) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }

            const chartData = {
                labels: bookings.map(booking => new Date(booking.booking_time)),
                datasets: [
                    {
                        label: "Price Per Hour",
                        data: bookings.map(booking =>{
                            let str = booking.price_per_hour
                            if (str.startsWith('$')) {

                                // Remove the dollar sign from the beginning of the string
                            
                                str = str.slice(1); // Removes the first character
                            
                            }
                            return str
                        }),
                        fill: false,
                        borderColor: "rgb(75, 192, 192)",
                        tension: 0.1
                    }
                ]
            };
            
            console.log(chartData,"123123")
            const chartConfig = {
                type: 'line',
                data: chartData,
                options: {
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'day'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            };

            if (chartRef.current) {
                chartInstanceRef.current = new Chart(chartRef.current, chartConfig);
            }

            return () => {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                    chartInstanceRef.current = null; 
                }
            };
        }
    }, [bookings]);

    
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
                                {bookings.length ? bookings
                                    .map(booking => (
                                        <Card key={booking.booking_id} variant="outlined" style={{ marginBottom: '1rem' }}>
                                            <CardContent>
                                                <Typography variant="h6">Booking ID: {booking.bookingId}</Typography>
                                                <Typography>Contractor ID: {booking.contractorId}</Typography>
                                                <Typography>Client ID: {booking.clientId}</Typography>
                                                <Typography>Client Address: {booking.client_address}</Typography>
                                                <Typography>Price Per Hour: {booking.price_per_hour}</Typography>
                                                <Typography>Booking Time: {new Date(booking.booking_time).toLocaleString()}</Typography>
                                                <Typography>End Time: {new Date(booking.end_time).toLocaleString()}</Typography>
                                            </CardContent>
                                        </Card>
                                    )) : <Typography>No bookings found.</Typography>}
                            </List>
                            <Box mt={2}>
                                <Button variant="contained" color="primary" component={Link} to="/">Book New Service</Button>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>Price Per Hour Over Time</Typography>
                            <canvas ref={chartRef}></canvas>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
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

