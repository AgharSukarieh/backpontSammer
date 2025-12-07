import React from 'react';
import { Container, Divider } from '@mui/material';
import Header from './Header';
import AddProblemSection from './AddProblemSection';
import PreviousQuestions from './PreviousQuestions';
import  { useState, useEffect } from 'react';
import { Box } from '@mui/material';

function ShareProblemLayout() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        transform: visible ? 'translateX(0)' : 'translateX(300px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.8s ease, opacity 0.8s ease',
      }}
    >
  
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, direction: 'rtl' }}>
      
      <Header />
      
      {/* <Divider sx={{ mb: 4, mt: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }} /> */}

      <AddProblemSection />

      <Divider sx={{ mb: 4, mt: 2, borderColor: 'rgba(0, 0, 0, 0.1)' }} />
      
      <PreviousQuestions />
      
    </Container>
    </Box>
  );
}

export default ShareProblemLayout;