import { Card, Box, Typography, CardMedia } from "@mui/material";
import { useState, useEffect } from "react";
import crown from "../../assets/crown.png";
import axios from "axios";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const borderColors = {
    1: "#FFC01D",
    2: "#C0C0C0",
    3: "#CD7F32"
  };




  
  useEffect(() => {
    axios.get("http://arabcodetest.runasp.net/User/GetTopCoder")
      .then(res => {
        setUsers(res.data.slice(0, 5));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  

  if (loading) return <Typography sx={{color:"black"}}>Loading leaderboard...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  if (!users || users.length === 0) {
  return <Typography sx={{textAlign:"center"}}>لا يوجد مستخدمين مسجلين لهذه المسابقة حتى الآن.</Typography>;
}

  return (
    
<Card className="LeaderBoardComp" sx={{ p: 2, borderRadius: 4, direction: "rtl", bgcolor: "#ffffff", color: "#000" }}>
      <Typography variant="h6" sx={{ mb: 2, color: "black", fontWeight: "bold", textAlign: "center" }}>
        التصنيف على مستوى المملكة
      </Typography>

      {users.map((u, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", py: 1 }}>
          {/* Rank Number */}
          <Typography sx={{ fontSize: 20, mr: 2, color: borderColors[u.rank] || "#f0f0f0" }}>
            {u.rank}
          </Typography>

          {/* Avatar with border */}
          <Box sx={{ ml: 1, position: "relative" }}>
            <CardMedia
              component="img"
              image={u.imageURL || "https://via.placeholder.com/45"}
              sx={{
                ml: 1,
                width: 45,
                height: 45,
                borderRadius: "100%",
                border: "3px solid",
                borderColor: borderColors[u.rank] || "#f0f0f0"
              }}
            />
            {u.rank === 1 && (
              <CardMedia
                component="img"
                image={crown}
                sx={{
                  position: "absolute",
                  top: -18,
                  left: "58%",
                  transform: "translateX(-50%)",
                  width: 20,
                  height: 20,
                }}
              />
            )}
          </Box>

          <Box sx={{ mr: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>{u.userName}</Typography>
            <Typography fontSize={13} color="black">
              التقييم: {u.totalSolved}
            </Typography>
          </Box>
        </Box>
      ))}
    </Card>
  );
}
