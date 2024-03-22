import React,{useEffect, useState} from 'react'
import { FormControl, FormGroup, FormControlLabel, Checkbox, Typography, Button } from '@mui/material';
import { getDatabase, ref, set } from 'firebase/database';

export default function AvailabilitySection({userData}) {
    const db = getDatabase()
    const [days, setDays] = useState({
        Sunday: userData.availability && userData.availability.Sunday ? userData.availability.Sunday : false,
        Monday: userData.availability && userData.availability.Monday ? userData.availability.Monday : false,
        Tuesday: userData.availability && userData.availability.Tuesday ? userData.availability.Tuesday : false,
        Wednesday: userData.availability && userData.availability.Wednesday ? userData.availability.Wednesday : false,
        Thursday: userData.availability && userData.availability.Thursday ? userData.availability.Thursday : false,
        Friday: userData.availability && userData.availability.Friday ? userData.availability.Friday : false,
        Saturday: userData.availability && userData.availability.Saturday ? userData.availability.Saturday : false,
      });

      const user = JSON.parse(localStorage.getItem("user-capstone"))
      const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setDays(prevDays => ({
          ...prevDays,
          [name]: checked,
        }));
      };
      function writeUserAvailabilityData(){
        set(ref(db, 'users/' + user.uid + '/availability/'), days);
      }
    
      return (
        <div>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked={days.Sunday} onChange={handleCheckboxChange} name="Sunday" />}
                label="Sunday"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked={days.Monday} onChange={handleCheckboxChange} name="Monday" />}
                label="Monday"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked={days.Tuesday} onChange={handleCheckboxChange} name="Tuesday" />}
                label="Tuesday"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked={days.Wednesday} onChange={handleCheckboxChange} name="Wednesday" />}
                label="Wednesday"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked={days.Thursday} onChange={handleCheckboxChange} name="Thursday" />}
                label="Thursday"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked={days.Friday} onChange={handleCheckboxChange} name="Friday" />}
                label="Friday"
              />
              <FormControlLabel
                control={<Checkbox defaultChecked={days.Saturday} onChange={handleCheckboxChange} name="Saturday" />}
                label="Saturday"
              />
            </FormGroup>
          </FormControl>
          <Typography>
            Selected Days: {Object.keys(days).filter(day => days[day]).join(', ')}
          </Typography>
          <Button variant="contained"  color="primary" onClick={writeUserAvailabilityData}>Save Availability</Button>
        </div>
      );
}
