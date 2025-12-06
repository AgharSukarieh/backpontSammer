import {  Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AvailableCompetitions from "./AvailableCompetitions.js";
import Leaderboard from "./Leaderboard.js";
import PastCompetitions from "./PastCompetitions.js";
import { API_BASE_URL } from "../../Database/URL.js";



export default function Layout() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [availableCompetitions, setAvailableCompetitions] = useState([]);
    const [pastCompetitions, setPastCompetitions] = useState([]);

useEffect(() => {
  axios.get(`${API_BASE_URL}/Contest/GetAllContest`)
    .then(res => {
      const data = res.data;

      const available = data.filter(c => new Date(c.endTime) >= new Date());
      const past = data.filter(c => new Date(c.endTime) < new Date());
      
      setAvailableCompetitions(available);
      setPastCompetitions(past);

      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
}, []);


  
  if (loading) return <Typography style={{color:"red"}}>جاري التحميل...</Typography>;
  if (error) return <Typography color="error">حدث خطأ: {error}</Typography>;

return (
  <>
  <Container maxWidth="lg" sx={{ mt: 2, minHeight: "100vh", overflow: "hidden" }}>
  
        <Grid container spacing={3}>


            <AvailableCompetitions  available={availableCompetitions} />

         

                 <Grid item xs={12} md={3}>

              <Leaderboard />

                </Grid>
                
                <Grid item xs={12} md={9}>
              <PastCompetitions past={pastCompetitions} />

          
          </Grid> 
        
        
        </Grid>
      </Container>

  </>
);
}

