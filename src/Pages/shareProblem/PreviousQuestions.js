import React from 'react';
import { Typography, CardMedia,Card, CardContent, Box } from '@mui/material';
import crownImg from './../../assets/crown.png';


// تعريف مكون بطاقة السؤال السابق
const PreviousQuestionCard = ({ title, status, image }) => (
  <Card sx={{ 
    mb: 2, 
    backgroundColor: 'rgba(196, 218, 217, 0.5)', 
    boxShadow: 'none', 
    border: '1px solid #ddd', 
    direction: 'rtl',
  }}>
  <CardContent
  sx={{
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    p: 2,
    '&:last-child': { paddingBottom: 2 },
  }}
>

  {/* النص */}
  <Box sx={{ textAlign: 'right', ml: 4 }}>
    <Typography
      variant="subtitle1"
      fontWeight="bold"
      
      sx={{ color: '#000000ff' , fontSize: '18px' }}
    >
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
      {status}
    </Typography>
  </Box>

  {/* الصورة */}
  <CardMedia
    component="img"
    image={crownImg}
    sx={{ width: 110, height: 80, borderRadius: 2 ,border:"1px solid gray", ml: 2}}
  >
    
    
    </CardMedia>

</CardContent>


  </Card>
);

const PreviousQuestions = () => {
  const questionData = [
    { title: "اسم السؤال", status: "حالة السؤال" },
    { title: "اسم السؤال", status: "حالة السؤال" },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography 
        variant="h5" 
        component="h2" 
        fontWeight="bold"
        
        sx={{ mb: 3 ,textAlign:'right',fontSize:'30px'}}
      >
        اسألتك السابقة
      </Typography>
      
      <Box>
        {questionData.map((item, index) => (
          <PreviousQuestionCard
            key={index}
            title={item.title}
            status={item.status}
            image={item.imagePath}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PreviousQuestions;