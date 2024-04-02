import React, { useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { useState } from 'react';
import { getDatabase } from 'firebase/database';

import { TextField, Checkbox, Button, FormControlLabel } from "@mui/material";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
const ContractRow = ({ contract, index }) => {
  const [clientDataFromDatabase, setClientDataFromDatabase] = useState(null);
  const db = getDatabase();
  useEffect(() => {const clientFromDatabaseRef = ref(db, 'users/' + contract.clientId);
  onValue(clientFromDatabaseRef, (snapshot) => {
      const data = snapshot.val();
      setClientDataFromDatabase(data);
  });}, []);
  const bookingTime = new Date(contract.booking_time);
  const endTime = new Date(contract.end_time);
  return (
  <TableRow key={index}>
    <TableCell>{clientDataFromDatabase && clientDataFromDatabase.clientData && clientDataFromDatabase.clientData.name}</TableCell>
    <TableCell>{bookingTime.toLocaleDateString() + " " + bookingTime.toLocaleTimeString()}</TableCell>
    <TableCell>{endTime.toLocaleDateString() + " " + endTime.toLocaleTimeString()}</TableCell>
    {/* <TableCell>{contract.clientId}</TableCell> */}
    <TableCell>{contract.client_address}</TableCell>
    <TableCell>{contract.service}</TableCell>
    {/* <TableCell>{contract.contractorId}</TableCell> */}
    <TableCell>{contract.description}</TableCell>
    <TableCell>{contract.price_per_hour}</TableCell>
    <TableCell>{contract.bookingId}</TableCell>
    
    
  </TableRow>

);}

export default ContractRow;