import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const mealCategories = ["Breakfast", "Lunch", "Dinner", "Extra"];

export default function DietaryPlanPage() {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mealName, setMealName] = useState("");
  const [portionSize, setPortionSize] = useState("");
  const [meals, setMeals] = useState({
    Breakfast: [],
    Lunch: [],
    Dinner: [],
    Extra: [],
  });

  const handleOpen = (category) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMealName("");
    setPortionSize("");
  };

  const handleAddMeal = () => {
    if (mealName && portionSize) {
      setMeals((prevMeals) => ({
        ...prevMeals,
        [selectedCategory]: [
          ...prevMeals[selectedCategory],
          { name: mealName, portion: portionSize },
        ],
      }));
    }
    handleClose();
  };

  const handleSave = () => {
    console.log("Saved Dietary Plan:", meals);
  };

  return (
    <Box>
      <Box sx={{ p: 3, textAlign: "center", height: { xs: "100%" , md:"70vh"} }}>
        <Typography variant="h5" gutterBottom>
          Make your own Dietary Plan
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {mealCategories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category}>
              <Card sx={{ bgcolor: "#fbeeff", p: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category}
                  </Typography>
                  <IconButton onClick={() => handleOpen(category)}>
                    <AddIcon />
                  </IconButton>
                  {meals[category].map((meal, index) => (
                    <Typography key={index}>
                      {meal.name} - {meal.portion}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Meal to {selectedCategory}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              margin="dense"
              label="Meal Name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Portion Size"
              value={portionSize}
              onChange={(e) => setPortionSize(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" onClick={handleAddMeal}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "end", m: "1rem", mr: "2rem" }}
      >
        <Button
          variant="contained"
          sx={{ mt: 3 }}
          size="large"
          color="success"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
