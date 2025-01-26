import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Title from "../../compenant/Title";
import "./style.scss";
import { useState } from "react";

const plans = [
  {
    id: 1,
    name: "Basic Explorer",
    price: "$29/month",
    features: {
      "Access to popular destinations": true,
      "Basic trip planning tools": true,
      "Email support": true,
      "Customizable itineraries": false,
      "Access to exclusive travel guides": false,
      "24/7 customer support": false,
      "Early access to deals & promotions": false,
      "VIP lounge access (select airports)": false,
      "Personal travel consultant": false,
      "Fully personalized travel experiences": false,
    },
  },
  {
    id: 2,
    name: "Adventurer",
    price: "$49/month",
    features: {
      "Access to popular destinations": true,
      "Basic trip planning tools": true,
      "Email support": true,
      "Customizable itineraries": true,
      "Access to exclusive travel guides": true,
      "24/7 customer support": false,
      "Early access to deals & promotions": false,
      "VIP lounge access (select airports)": false,
      "Personal travel consultant": false,
      "Fully personalized travel experiences": false,
    },
  },
  {
    id: 3,
    name: "Premium Voyager",
    price: "$99/month",
    features: {
      "Access to popular destinations": true,
      "Basic trip planning tools": true,
      "Email support": true,
      "Customizable itineraries": true,
      "Access to exclusive travel guides": true,
      "24/7 customer support": true,
      "Early access to deals & promotions": true,
      "VIP lounge access (select airports)": true,
      "Personal travel consultant": false,
      "Fully personalized travel experiences": false,
    },
  },
  {
    id: 4,
    name: "Elite Globetrotter",
    price: "$199/month",
    features: {
      "Access to popular destinations": true,
      "Basic trip planning tools": true,
      "Email support": true,
      "Customizable itineraries": true,
      "Access to exclusive travel guides": true,
      "24/7 customer support": true,
      "Early access to deals & promotions": true,
      "VIP lounge access (select airports)": true,
      "Personal travel consultant": true,
      "Fully personalized travel experiences": true,
    },
  },
];

export default function PlansCard() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  return (
    <>
      <Title title="Discover our prices" />
      <Container sx={{ mt: 10 }}>
        <Grid2 container>
          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box className="plans-price">
              {plans.map((plan) => {
                return (
                  <Stack
                    onClick={() => setSelectedPlan(plan)}
                    key={`${plan.id} - ${"plans"}`}
                    direction={"row"}
                    sx={{
                      justifyContent: "space-between",
                      backgroundColor:
                        selectedPlan.name == plan.name ? "#1fd755" : "#181818",
                    }}
                    className="plans-price-card"
                  >
                    <Typography variant="h6" component={"h6"}>
                      {plan.name}
                    </Typography>
                    <Typography variant="h6" component={"h6"}>
                      {plan.price}
                    </Typography>
                  </Stack>
                );
              })}
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
            <Box className="plans-featrues">
              {Object.entries(selectedPlan.features).map(
                ([feature, included], index) => {
                  return (
                    <>
                      <Box sx={{ m: 1.15 }} key={`${index} - plans-featrues`}>
                        <Stack
                          direction={"row"}
                          sx={{
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: (theme) => theme.palette.text.secondary,
                            }}
                          >
                            {feature}
                          </Typography>
                          {included ? (
                            <CheckCircleOutlineIcon
                              sx={{ fontSize: 22, color: "#40c9a2" }}
                            />
                          ) : (
                            <HighlightOffIcon
                              sx={{
                                fontSize: 22,
                                color: (theme) => theme.palette.text.secondary,
                              }}
                            />
                          )}
                        </Stack>
                      </Box>
                    </>
                  );
                }
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
