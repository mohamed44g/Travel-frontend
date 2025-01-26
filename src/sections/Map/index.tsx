/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Box,
  Button,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import Title from "../../compenant/Title";
import FeaturesList from "../../compenant/list";
import Revail from "../../compenant/Revail";

const DarkMap = () => {
  const mapRef = useRef('');

  useEffect(() => {
    // Initialize the map
    const map = L.map(mapRef.current, {
      center: [51.505, -0.09],
      zoom: 13,
      zoomControl: false, // Disable zoom controls
    }); // Centered at [0, 0] with zoom level 2
    // Add a dark-themed tile layer
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    ).addTo(map);

    map.on("click", (e: { latlng: { lat: any; lng: any; }; }) => {
      const { lat, lng } = e.latlng;
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(`You clicked at ${lat}, ${lng}`);
    });

    map.locate({ setView: true, maxZoom: 16 });
    map.on("locationfound", (e: { latlng: any; }) => {
      L.marker(e.latlng).addTo(map).bindPopup("You are here!");
    });

    // Clean up on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <Title title="Find your location" />
      <Container sx={{ mt: 10 }}>
        <Grid2
          container
          sx={{
            justifyContent: "center",
            alignItems: "center",
            margin: { xs: 2, md: 0 },
          }}
        >
          <Grid2
            size={{ xs: 12, md: 6 }}
            sx={{ order: { xs: 2, md: 1 }, marginTop: { xs: 5, md: 0 } }}
          >
            <Box>
              <Revail>
                <Typography variant="h5">Explore Destinations</Typography>
              </Revail>
              <Revail>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: (theme) => theme.palette.text.secondary }}
                >
                  Find your next adventure.and plan your perfect trip with ease.
                </Typography>
              </Revail>
              <FeaturesList />
              <Button
                sx={{ borderColor: "#fff", color: "#fff", mt: 4 }}
                variant="outlined"
                className="Home-btn"
              >
                Learn more
              </Button>
            </Box>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
            <Box
              ref={mapRef}
              style={{
                height: "50vh",
                backgroundColor: "#111",
                borderRadius: "8px",
                margin: "0 auto",
              }}
            ></Box>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default DarkMap;
