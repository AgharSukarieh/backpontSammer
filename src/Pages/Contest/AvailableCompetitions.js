import { Card, CardMedia, Box, Typography, Container, Divider } from "@mui/material";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect } from "react";

export default function AvailableCompetitions({ available}) {
  const [visibleItems, setVisibleItems] = useState([]);
  const [direction, setDirection] = useState(null);

  useEffect(() => {
    if (available && available.length > 0) {
      setVisibleItems(
        available.length >= 3
          ? [0, 1, 2]
          : available.map((_, i) => i)
      );
    }
  }, [available]);

  const handleNext = () => {
    setDirection("right");
    setTimeout(() => {
      setVisibleItems(prev => prev.map(i => (i + 1) % available.length));
      setDirection(null);
    }, 300);
  };

  const handlePrev = () => {
    setDirection("left");
    setTimeout(() => {
      setVisibleItems(prev => prev.map(i => (i - 1 + available.length) % available.length));
      setDirection(null);
    }, 300);
  };


  if (!available || available.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 3 }}>
        <h2>لا توجد مسابقات متاحة</h2>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ position: "relative", textAlign: "center" , display:"flex", alignItems:"center", justifyContent:"center"}}>
      <Divider style={{ margin: "10px", color: "black", borderBottomWidth: "4" }} />

      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, position: "relative", overflow: "hidden", margin: "0 auto" }}>
         <ArrowForwardIosIcon
          onClick={handleNext}
          sx={{ fontSize: 30, color: "black", cursor: "pointer", zIndex: 10 }}
        />

        <Box sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 0.5,
          transition: "transform 0.3s ease",
          transform: direction === "left" ? "translateX(100px)" : direction === "right" ? "translateX(-100px)" : "translateX(0)"
        }}>
          {visibleItems.map((index, pos) => {
            const item = available[index];
            return (
              <Card
                key={item.id}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                  width: 310,
                  height: "180px",
                  flexShrink: 0,
                  margin: "10px",
                  transition: "transform 0.3s ease"
                }}
              >
                <CardMedia
                  component="img"
                  image={item.imageURL && item.imageURL !== "" ? item.imageURL : "https://via.placeholder.com/150"}
                  alt={item.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <Box sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  bgcolor: "rgba(0,0,0,0.45)",
                  color: "#fff",
                  py: 0.5,
                }}>
                  <Typography>{pos + 1} - {item.name}</Typography>
                  <Typography fontSize={13}>
                    {item.universityName || "عمان"} — {new Date(item.startTime).toLocaleDateString("ar-JO")}
                  </Typography>
                </Box>
              </Card>
            );
          })}
        </Box>

          
       
        <ArrowBackIosNewIcon
          
          
          onClick={handlePrev}
          sx={{ fontSize: 30, color: "black", cursor: "pointer", zIndex: 10 }}
        />

      </Box>
    </Container>
  );
}
