import {
  Box,
  Tabs,
  Tab,
  Grid,
  Button,
  Typography,
  Card,
  CardMedia
} from "@mui/material";
import { useState } from "react";
import CompetitionDetails from './CompetitionDetails';

export default function PastCompetitions({past}) {
  const [tab, setTab] = useState(0);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const handleDetailsClick = (competition) => setSelectedCompetition(competition);
  const handleBackClick = () => setSelectedCompetition(null);

  return (
    <Card sx={{ p: 2, 
    borderRadius: 4, 
    direction: "rtl",
    width: "100%", 
    maxWidth: 800,      // نفس مساحة الكارد الأصلي
    minHeight: 400  }}>
      
      {/* القسم العلوي Tabs */}
      <Tabs
        value={tab}
        onChange={(e, v) => { setTab(v); setSelectedCompetition(null); }}
        centered
        sx={{ mb: 2 }}
      >
        <Tab label="المسابقات" sx={{ fontWeight: "bold", fontSize: "20px" }} />
        <Tab label="مسابقاتي" sx={{ fontWeight: "bold", fontSize: "20px" }} />
      </Tabs>

      {selectedCompetition ? (

  <Box sx={{ width: "600px", height: "100%" }}>
      <CompetitionDetails 
        competition={selectedCompetition} 
        onBack={handleBackClick} 
      />
  </Box>
      ) : tab === 0 ? (
        
        /* جميع المسابقات */
        <Grid container spacing={2}>
          {past.map((c) => (
            <Grid item xs={12} md={6} key={c.id}>
              <Card sx={{
                display: "flex",
                flexDirection: "row-reverse",
                p: 1,
                borderRadius: 3,
                width: "350px"
              }}>
                
                <Box sx={{ pr: 2, flex: 1 }}>
                  <Typography>{c.name}</Typography>

                  <Typography fontSize={13}>
                    {new Date(c.startTime).toLocaleDateString("ar-JO")} —{" "}
                    {new Date(c.startTime).toLocaleTimeString("ar-JO")}
                  </Typography>

                  <Button
                    variant="contained"
                    sx={{ mt: 1, borderRadius: 5, width: "100%", backgroundColor: "#00606B" }}
                    onClick={() => handleDetailsClick(c)}
                  >
                    للمزيد من التفاصيل
                  </Button>
                </Box>

                {/* استخدم صورة ال API أو صورة افتراضية */}
                <CardMedia
                  component="img"
                  image={c.imageURL && c.imageURL !== "" ? c.imageURL : "https://via.placeholder.com/110x80"}
                  sx={{ width: 110, height: 80, borderRadius: 2 }}
                />

              </Card>
            </Grid>
          ))}
        </Grid>

      ) : (

        /* مسابقاتي فقط */
        <Box>
          {past.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                mb: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                alignItems: "center"
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography><b>اسم المسابقة:</b> {item.name}</Typography>
                <Typography><b>وقت الانتهاء:</b> {new Date(item.endTime).toLocaleDateString("ar-JO")} - {new Date(item.endTime).toLocaleTimeString("ar-JO")}</Typography>
              </Box>

              <CardMedia
                component="img"
                image={item.imageURL && item.imageURL !== "" ? item.imageURL : "https://via.placeholder.com/150"}
                sx={{ width: "30%", borderRadius: 2 }}
              />
            </Box>
          ))}
        </Box>

      )}
    </Card>
  );
}
