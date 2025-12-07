import React from 'react';
import { useState, useEffect } from 'react';

import { Typography, Grid, Card, CardContent, Box } from '@mui/material';

const motivationalTexts = [
  "أفكار تستحق أن ترى النور! ما التحدي القادم الذي تواجهه؟",
  "شارك تحديك: ساهم في إثراء مجتمعنا المعرفي بأصعب الأسئلة.",
  "كن صانع التغيير: اطرح سؤالاً يفتح آفاقاً جديدة للمناقشة.",
];

// لون الظل (تركواز خفيف)
const shadowColor = 'rgba(23, 160, 164, 0.3)'; 

const SuggestionCard = ({ text ,visible }) => (
  <Card sx={{ 
    height: 150,
      width: 250,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: "29px",
      boxShadow: `5px 5px 2px 1px  ${shadowColor}`,
      border: '3px solid transparent',
      borderColor: 'rgba(23, 160, 164, 0.3)',
      transition: 'transform 0.8s ease, opacity 0.8s ease',
      transform: visible ? 'translateX(0)' : 'translateX(300px)',
      opacity: visible ? 1 : 0,
      '&:hover': {
        boxShadow: `5px 5px 5px 3px ${shadowColor}`,
        transform: visible ? 'translateX(0)' : 'translateX(300px)',
        cursor: 'default',
    },
  }}>
    <Typography variant="body1" sx={{ color: 'black', p: 2 }}>
      {text}
    </Typography>
  </Card>
);

const Header = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // بعد تحميل الصفحة، شغل الحركة
    const timer = setTimeout(() => setVisible(true), 100); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ mb: 6, direction: 'rtl' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom 
        fontWeight="bold"
        sx={{ mb: 4 }}
        color='black'
      >
        كن مؤثراً وشارك سؤالك
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {motivationalTexts.map((text, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <SuggestionCard text={text} visible={visible} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Header;