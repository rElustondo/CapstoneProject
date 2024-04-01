import ImageUpload from "./ImageUpload";
import React, { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
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

function MyComponent({ userDataFromDatabase }) {
  const [contractorData, setContractorData] = useState({});
  const [updateProfile, setUpdateProfile] = useState(false);
  console.log(contractorData, "contractorData");
  const db = getDatabase();
  const user = JSON.parse(localStorage.getItem("user-capstone"));
  function writeUserData(userId) {
    if (contractorData.name)
      set(
        ref(db, "users/" + user.uid + "/contractorData/name"),
        contractorData.name
      );
    if (contractorData.phone)
      set(
        ref(db, "users/" + user.uid + "/contractorData/phone"),
        contractorData.phone
      );
    if (contractorData.location)
      set(
        ref(db, "users/" + user.uid + "/contractorData/location"),
        contractorData.location
      );
    if (contractorData.basicPrice)
      set(
        ref(db, "users/" + user.uid + "/contractorData/basicPrice"),
        contractorData.basicPrice
      );
    if (contractorData.specialties) {
      if (
        contractorData.specialties.snowShoveling != null &&
        contractorData.specialties.snowShoveling != undefined
      )
        set(
          ref(
            db,
            "users/" + user.uid + "/contractorData/specialties/snowShoveling"
          ),
          contractorData.specialties.snowShoveling
        );
      if (
        contractorData.specialties.landscaping != null &&
        contractorData.specialties.landscaping != undefined
      )
        set(
          ref(
            db,
            "users/" + user.uid + "/contractorData/specialties/landscaping"
          ),
          contractorData.specialties.landscaping
        );
      if (
        contractorData.specialties.gardening != null &&
        contractorData.specialties.gardening != undefined
      )
        set(
          ref(
            db,
            "users/" + user.uid + "/contractorData/specialties/gardening"
          ),
          contractorData.specialties.gardening
        );
      if (
        contractorData.specialties.drivewaySealing != null &&
        contractorData.specialties.gardening != undefined
      )
        set(
          ref(
            db,
            "users/" + user.uid + "/contractorData/specialties/drivewaySealing"
          ),
          contractorData.specialties.drivewaySealing
        );
    }
  }
  const contractsDummy = [
    {
      clientName: "John Doe",
      totalAmount: "$100",
      date: "2021-10-01",
      recurringWeekly: true,
      address: "123 Main St, Anytown, USA",
      specialty: "snowShoveling",
      description: "Shovel snow from driveway and walkway",
    },
    {
      clientName: "Jane Doe",
      totalAmount: "$200",
      date: "2021-10-02",
      recurringWeekly: false,
      address: "456 Elm St, Anytown, USA",
      specialty: "landscaping",
      description: "Mow lawn and trim bushes",
    },
  ];
  // Calculate total income
  let totalIncome = 0;
  contractsDummy.forEach((contract) => {
    const amount = Number(contract.totalAmount.replace("$", ""));
    totalIncome += amount;
  });
  function contracts(contracts) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Current Contracts
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Client Name</TableCell>
                  <TableCell>Total Invoiced Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Recurring Weekly</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Specialty</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contracts.map((contract, index) => (
                  <TableRow key={index}>
                    <TableCell>{contract.clientName}</TableCell>
                    <TableCell>{contract.totalAmount}</TableCell>
                    <TableCell>{contract.date}</TableCell>
                    <TableCell>
                      {contract.recurringWeekly ? "Yes" : "No"}
                    </TableCell>
                    <TableCell>{contract.address}</TableCell>
                    <TableCell>{contract.specialty}</TableCell>
                    <TableCell>{contract.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    );
  }
  function updateProfileForm() {
    return (
      <div>
        <h1>Hello, World!</h1>
        <div>
          <h3>Full Name: </h3>
          <TextField
            variant="outlined"
            onChange={(e) =>
              setContractorData({ ...contractorData, name: e.target.value })
            }
            defaultValue={userDataFromDatabase.contractorData.name} // Use value instead of defaultValue
          />
          <br />
          <h3>Phone Number: </h3>
          <TextField
            variant="outlined"
            onChange={(e) =>
              setContractorData({ ...contractorData, phone: e.target.value })
            }
            defaultValue={userDataFromDatabase.contractorData.phone} // Use value instead of defaultValue
          />
          <br />
          <h3>Location: </h3>
          <TextField
            variant="outlined"
            onChange={(e) =>
              setContractorData({ ...contractorData, location: e.target.value })
            }
            defaultValue={userDataFromDatabase.contractorData.location} // Use value instead of defaultValue
          />
          <br />
          <h3>Basic Price ($/h): </h3>
          <TextField
            variant="outlined"
            type="number"
            onChange={(e) =>
              setContractorData({
                ...contractorData,
                basicPrice: e.target.value,
              })
            }
            defaultValue={userDataFromDatabase.contractorData.basicPrice} // Use value instead of defaultValue
          />
        </div>
        <div>
          <h3>Specialties: </h3>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={
                  userDataFromDatabase.contractorData.specialties.snowShoveling
                }
                onChange={(e) =>
                  setContractorData({
                    ...contractorData,
                    specialties: {
                      ...contractorData.specialties,
                      snowShoveling: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Snow Showeling"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={
                  userDataFromDatabase.contractorData.specialties.landscaping
                }
                onChange={(e) =>
                  setContractorData({
                    ...contractorData,
                    specialties: {
                      ...contractorData.specialties,
                      landscaping: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Landscaping"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={
                  userDataFromDatabase.contractorData.specialties.gardening
                }
                onChange={(e) =>
                  setContractorData({
                    ...contractorData,
                    specialties: {
                      ...contractorData.specialties,
                      gardening: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Gardening"
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={
                  userDataFromDatabase.contractorData.specialties
                    .drivewaySealing
                }
                onChange={(e) =>
                  setContractorData({
                    ...contractorData,
                    specialties: {
                      ...contractorData.specialties,
                      drivewaySealing: e.target.checked,
                    },
                  })
                }
              />
            }
            label="Driveway Sealing"
          />
        </div>
        <Button onClick={writeUserData} variant="contained">
          Save
        </Button>
      </div>
    );
  }
  return (
    <div>
      <h2>Total Income For Current Contracts: ${totalIncome.toFixed(2)}</h2>
      <span>Update Contractor Profile</span>
      <Checkbox onChange={(e) => setUpdateProfile(e.target.checked)}></Checkbox>
      {updateProfile && updateProfileForm()}
      {contracts(contractsDummy)}
      <ImageUpload userDataFromDatabase={userDataFromDatabase}/>
    </div>
  );
}

export default MyComponent;
