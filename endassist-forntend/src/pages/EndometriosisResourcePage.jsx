import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Paper
} from "@mui/material";

const EndometriosisResourcePage = () => {

  // State for tracking which sections are expanded
  const [expanded, setExpanded] = useState({
    understanding: false,
    managingPain: false,
    nutrition: false,
    faq: false,
  });

  const toggleExpand = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section],
    });
  };

  // Section data
  const sections = [
    {
      id: "understanding",
      title: "Understanding Endometriosis",
      img: "/assets/images/edu1.png",
      shortDesc:
        "Learn about the symptoms, causes, and treatments for endometriosis.",
      content: (
        <>
          <Typography variant="body1" paragraph>
            Endometriosis is a chronic and often painful condition where tissue
            similar to the lining of the uterus (endometrium) grows outside the
            uterus. This condition primarily affects the ovaries, fallopian
            tubes, and the tissue lining the pelvis, but in rare cases it can
            spread beyond the pelvic organs.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Symptoms of Endometriosis
          </Typography>
          <Typography variant="body1" paragraph>
            The symptoms of endometriosis vary in intensity and may worsen over
            time. Some women experience mild symptoms, while others endure
            severe pain that affects their daily life.
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
            Common Symptoms:
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary="Severe Pelvic Pain – Often occurs before and during menstruation but can also happen at other times." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Heavy Menstrual Flow – Periods may be heavier than normal or include clotting or spotting between periods." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Pain During or After Intercourse – Deep pelvic pain during intimacy is a common symptom." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Painful Bowel Movements or Urination – Particularly during menstruation." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Infertility – Endometriosis can affect reproductive health and make conception difficult." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Chronic Fatigue – Feeling exhausted, even after adequate rest." />
            </ListItem>
            <ListItem>
              <ListItemText primary="Bloating (Endo Belly), Nausea, and Digestive Issues – Some women experience symptoms similar to irritable bowel syndrome (IBS)." />
            </ListItem>
          </List>
        </>
      ),
    },
    {
      id: "managingPain",
      title: "Managing Pain with Endometriosis",
      img: "/assets/images/edu2.png",
      shortDesc:
        "Explore strategies for managing chronic pain associated with endometriosis.",
      content: (
        <>
          <Typography variant="body1" paragraph>
            Pain management is a crucial aspect of living with endometriosis.
            The right approach varies from person to person, and often a
            combination of strategies works best.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Pain Management Strategies
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
            Medical Treatments:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Pain Medications"
                secondary="Over-the-counter NSAIDs like ibuprofen or prescription pain relievers may help reduce inflammation and pain."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Hormone Therapy"
                secondary="Birth control pills, patches, or hormonal IUDs can help control hormonal fluctuations that trigger pain."
              />
            </ListItem>
          </List>

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Complementary Approaches:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Heat Therapy"
                secondary="Applying heat to the lower abdomen can help relax pelvic muscles and reduce pain."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Physical Therapy"
                secondary="Specialized pelvic floor physical therapy can help with pain management."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Stress Management"
                secondary="Techniques such as mindfulness meditation, yoga, and deep breathing can help manage pain perception."
              />
            </ListItem>
          </List>
        </>
      ),
    },
    {
      id: "nutrition",
      title: "Nutrition and Endometriosis",
      img: "/assets/images/edu3.png",
      shortDesc:
        "Discover how diet can impact endometriosis symptoms and overall health.",
      content: (
        <>
          <Typography variant="body1" paragraph>
            While diet alone cannot cure endometriosis, many women find that
            certain dietary changes help manage inflammation and reduce symptom
            severity.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Dietary Considerations
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
            Foods that may reduce inflammation:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Fruits and vegetables"
                secondary="Especially those rich in antioxidants like berries, leafy greens, and colorful produce."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Omega-3 fatty acids"
                secondary="Found in fatty fish, walnuts, and flaxseeds."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Fiber-rich foods"
                secondary="Whole grains, legumes, and vegetables help maintain hormonal balance."
              />
            </ListItem>
          </List>

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Foods that may trigger symptoms:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Processed foods"
                secondary="High in trans fats and preservatives that may increase inflammation."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Red meat"
                secondary="May increase estrogen production and inflammation."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Gluten and dairy"
                secondary="Some women with endometriosis report symptom improvement when reducing these foods."
              />
            </ListItem>
          </List>
        </>
      ),
    },
    {
      id: "faq",
      title: "Frequently Asked Questions (FAQs)",
      img: "/assets/images/edu4.png",
      shortDesc: "Common Misconceptions About Endometriosis",
      content: (
        <>
          <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
            Common Misconceptions
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            "It's just a bad period"
          </Typography>
          <Typography variant="body1" paragraph>
            Endometriosis pain is significantly different from typical menstrual
            cramps. The condition involves tissue growing outside the uterus and
            can cause severe, chronic pain that may not correlate with menstrual
            cycles.
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            "Pregnancy cures endometriosis"
          </Typography>
          <Typography variant="body1" paragraph>
            While pregnancy may temporarily suppress symptoms due to hormonal
            changes, it is not a cure. Symptoms often return after childbirth.
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            "Hysterectomy is the only treatment"
          </Typography>
          <Typography variant="body1" paragraph>
            A hysterectomy (removal of the uterus) alone does not necessarily
            cure endometriosis, especially if tissue has grown on other organs.
            There are many treatment options available before considering this
            major surgery.
          </Typography>

          <Typography variant="subtitle1" fontWeight="bold">
            "It only affects older women"
          </Typography>
          <Typography variant="body1" paragraph>
            Endometriosis can affect women of any age, including teenagers.
            Early diagnosis and treatment are important for managing the
            condition effectively.
          </Typography>
        </>
      ),
    },
  ];

  // Support and treatment sections (fixed cards at bottom)
  const bottomCards = [
    {
      title: "Advanced Treatments",
      img: "/assets/images/edu5.png",
      description: "Learn about the latest treatments for endometriosis.",
      buttonText: "View Resource",
    },
    {
      title: "Support Groups",
      img: "/assets/images/edu6.png",
      description: "Connect with others who understand your journey.",
      buttonText: "View Resource",
    },
  ];

  return (
    <Container sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#fce6f1",
          py: 3,
          borderRadius: 10,
          mb: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Educational Resources
        </Typography>
        <Typography variant="body1" align="center" fontWeight="bold" my="2rem">
          Explore our collection of articles, videos, and guides to learn more
          about endometriosis.
        </Typography>

        {/* Main content sections with collapsible panels */}
        {sections.map((section) => (
          <Box key={section.id} sx={{ mb: 3 }}>
            <Card
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                bgcolor: "white",
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box
                  onClick={() => toggleExpand(section.id)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img src={section.img} alt={section.title} />
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    mt="1rem"
                    gutterBottom
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    align="center"
                    color="textSecondary"
                    fontWeight="bold"
                    my="1rem"
                    gutterBottom
                  >
                    {section.shortDesc}
                  </Typography>
                  {expanded[section.id] ? (
                    <img src="/assets/logo/up-arrow.png" alt="up" />
                  ) : (
                    <img src="/assets/logo/down-arrow.png" alt="down" />
                  )}
                </Box>

                <Collapse
                  in={expanded[section.id]}
                  sx={{ backgroundColor: "#fce6f1" }}
                >
                  <Box sx={{ mt: 2, px: { xs: 1, sm: 2 } }}>
                    {section.content}
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Box>
        ))}

        {/* Bottom cards for additional resources */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {bottomCards.map((card, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ height: "100%", borderRadius: 2 }}>
                <CardContent>
                  <img src={card.img} alt={card.title} />
                  <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    fontWeight="bold"
                    mt="1rem"
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    align="center"
                    gutterBottom
                    fontWeight="bold"
                    mt="1rem"
                  >
                    {card.description}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        borderRadius: 4,
                        bgcolor: "#1e857a",
                        "&:hover": {
                          bgcolor: "#166b62",
                        },
                      }}
                    >
                      {card.buttonText}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default EndometriosisResourcePage;
