import React, { useState } from "react";
import {
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
  Box,
  useMediaQuery,
  Modal,
  Backdrop,
  Fade,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { getRecommendation } from "../services/chatService";

export default function PersonalizedCarePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State to manage form inputs
  const [formData, setFormData] = useState({
    symptoms: [],
    menstrualStage: "",
    lifestyle: "",
    allergies: "",
    hygieneProducts: [],
    dietaryPreferences: [],
  });

  // State for modal visibility and response data
  const [openModal, setOpenModal] = useState(false);
  const [recommendation, setRecommendation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle Checkbox Change
  const handleCheckboxChange = (event, category) => {
    const { name, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [category]: checked
        ? [...prev[category], name]
        : prev[category].filter((item) => item !== name),
    }));
  };

  // Handle Radio Button Change
  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await getRecommendation(formData);
      console.log(data)
      setRecommendation(data); // Store response
      setOpenModal(true); // Open modal
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error("Error fetching recommendation:", err);
    }
  };

  // Close Modal
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Container sx={{ py: 4, bgcolor: "#f5f5f5", borderRadius: 2, m: "2rem" }}>
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="bold"
          align="center"
          mb={2}
        >
          "Your Personalized Care for Endometriosis"
        </Typography>
        <Typography variant="body1" align="center" mb={4}>
          Answer the questions below to receive tailored hygiene tips, product
          suggestions, and nutritional advice helping you feel confident and
          comfortable every day.
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Symptoms Section */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold">
              What symptoms are you experiencing?
            </Typography>
            <FormGroup>
              {[
                "Heavy Bleeding",
                "Cramps or Discomfort",
                "Irregular Flow",
                "Fatigue or Low Energy",
                "Spotting Between Periods",
                "Bloating",
              ].map((symptom) => (
                <FormControlLabel
                  key={symptom}
                  control={
                    <Checkbox
                      name={symptom}
                      checked={formData.symptoms.includes(symptom)}
                      onChange={(e) => handleCheckboxChange(e, "symptoms")}
                    />
                  }
                  label={symptom}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Menstrual Cycle Stage */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold">
              What stage of your menstrual cycle are you currently in?
            </Typography>
            <RadioGroup
              name="menstrualStage"
              value={formData.menstrualStage}
              onChange={handleRadioChange}
            >
              {[
                "Pre-Period",
                "Mid-Period (Active Bleeding)",
                "End of Period",
                "Post-Period",
              ].map((stage) => (
                <FormControlLabel
                  key={stage}
                  value={stage}
                  control={<Radio />}
                  label={stage}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Lifestyle Section */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold">
              What best describes your current lifestyle?
            </Typography>
            <RadioGroup
              name="lifestyle"
              value={formData.lifestyle}
              onChange={handleRadioChange}
            >
              {[
                "Active (e.g., frequent exercise, physically demanding tasks)",
                "Sedentary (e.g., mostly sitting, less physical activity)",
              ].map((lifestyle) => (
                <FormControlLabel
                  key={lifestyle}
                  value={lifestyle}
                  control={<Radio />}
                  label={lifestyle}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Allergies Section */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold">
              Do you have any skin sensitivity or allergies to hygiene products?
            </Typography>
            <RadioGroup
              name="allergies"
              value={formData.allergies}
              onChange={handleRadioChange}
            >
              {["Yes", "No"].map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio />}
                  label={option}
                />
              ))}
            </RadioGroup>
          </Box>

          {/* Hygiene Products */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold">
              What hygiene products are you currently using?
            </Typography>
            <FormGroup>
              {[
                "Sanitary Pads",
                "Tampons",
                "Menstrual Cups",
                "Cloth Pads",
                "Panty Liners",
                "Other",
              ].map((product) => (
                <FormControlLabel
                  key={product}
                  control={
                    <Checkbox
                      name={product}
                      checked={formData.hygieneProducts.includes(product)}
                      onChange={(e) =>
                        handleCheckboxChange(e, "hygieneProducts")
                      }
                    />
                  }
                  label={product}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Dietary Preferences */}
          <Box mb={3}>
            <Typography variant="h6" fontWeight="bold">
              Dietary Preferences or Restrictions
            </Typography>
            <FormGroup>
              {[
                "Vegetarian",
                "Gluten-Free",
                "Lactose-Free",
                "No Restrictions",
              ].map((diet) => (
                <FormControlLabel
                  key={diet}
                  control={
                    <Checkbox
                      name={diet}
                      checked={formData.dietaryPreferences.includes(diet)}
                      onChange={(e) =>
                        handleCheckboxChange(e, "dietaryPreferences")
                      }
                    />
                  }
                  label={diet}
                />
              ))}
            </FormGroup>
          </Box>

          {/* Submit Button */}
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
              loading={isLoading}
              loadingPosition="end"
            >
              Get Recommendations
            </Button>
          </Box>
        </form>

        <Dialog fullWidth open={openModal}>
          <DialogContent>
            <Box sx={{ m: "1rem" }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                mt={"1rem"}
              >
                Meals
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {recommendation.meals}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                mt={"1rem"}
              >
                Products
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {recommendation.products}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                mt={"1rem"}
              >
                Tips
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {recommendation.tips}
              </Typography>
              <Box textAlign="center" mt={3}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
}
