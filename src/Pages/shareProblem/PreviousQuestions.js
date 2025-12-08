import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, CardMedia, Card, CardContent, Box } from '@mui/material';
import crownImg from './../../assets/crown.png';

// بطاقة السؤال
const PreviousQuestionCard = ({ title, status, image }) => (
  <Card
    sx={{
      mb: 2,
      backgroundColor: 'rgba(196, 218, 217, 0.5)',
      boxShadow: 'none',
      border: '1px solid #ddd',
      direction: 'rtl',
    }}
  >
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
        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#000', fontSize: '18px' }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {status === 1 ? "قيد المراجعة" : status === 2 ? "مقبول" : "غير معروف"}
        </Typography>
      </Box>

      {/* الصورة */}
      <CardMedia
        component="img"
        image={image ? image : crownImg}
        sx={{ width: 110, height: 80, borderRadius: 2, border: "1px solid gray", ml: 2 }}
      />
    </CardContent>
  </Card>
);


const PreviousQuestions = ({ userId }) => {
  
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (!userId) return; // لا تعمل call إذا مافي userId

    const fetchProblems = async () => {
      try {
        const res = await axios.get(
          `http://arabcodetest.runasp.net/ProblemRequest/User/${userId}`
        );

        const data = res.data;

        // API ممكن يرجّع object واحد → نحوله array
        const formatted = Array.isArray(data) ? data : [data];

        setQuestions(formatted);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, [userId]); // رح يعيد تحميل الداتا إذا تغيّر الـ userId

  return (
    <Box sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        sx={{ mb: 3, textAlign: 'right', fontSize: '30px' }}
      >
        اسألتك السابقة
      </Typography>

      <Box>
        {questions.length === 0 ? (
          <Typography sx={{ textAlign: "right", color: "#777" }}>
            لم يتم طرح أسئلة من طرفك من قبل.
          </Typography>
        ) : (
          questions.map((item) => (
            <PreviousQuestionCard
              key={item.id}
              title={item.title}
              status={item.status}
              image={item.imageUrl}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default PreviousQuestions;
