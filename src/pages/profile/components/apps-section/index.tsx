import { Box, Button, Grid2, Rating, Stack, Typography } from "@mui/material";
import "./index.scss";
import PlaceIcon from "@mui/icons-material/Place";
import Loader from "../../../../compenant/Loader";
import { Getdata } from "../../../../apis/destenation";
import { convertDate } from "../../../../utils/convertTohumandate";
import axiosInstance from "../../../../config/axois.config";
import toast from "react-hot-toast";
import { Suspense, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Iproduct {
  user_id: number; // Unique identifier for the user
  trip_id: number; // Unique identifier for the trip
  num_travelers: number; // Number of travelers for the trip
  created_at: string; // Date when the trip was created
  name: string; // Name of the trip
  image: string; // URL of the trip image
  location: string; // Location of the trip
  date: string; // Start date of the trip
  time: string; // Duration of the trip
  price: string; // Price of the trip
  rating: string; // Rating of the trip
}

const Product = ({
  trip_id,
  image,
  name,
  price,
  date,
  num_travelers,
  location,
  rating,
  des,
}: Iproduct) => {
  const queryClient = useQueryClient();
  const handelCancel = async () => {
    try {
      await axiosInstance.delete(`/users/destination/${+trip_id}`);
      await queryClient.refetchQueries({ queryKey: ["userDestinations"] });
      toast.success("Destination deleted successfully!");
    } catch (e) {
      toast.error(e?.message);
    }
  };
  return (
    <>
      <div className="product">
        <div className="product-content">
          <div className="product-img">
            <div className="product-img-overlay"></div>
            <img src={image} alt="product image" loading="lazy" />
          </div>
        </div>

        <div className="product-info">
          <Typography variant="body1">{name}</Typography>

          <Stack
            className="product-location"
            direction={"row"}
            sx={{
              alignItems: "center",
              mt: 1,
              ml: -0.5,
            }}
          >
            <PlaceIcon
              sx={{
                fontSize: 18,
              }}
            />
            <span>{location}</span>
          </Stack>

          <Box>
            <Rating
              name="half-rating-read"
              sx={{
                fontSize: 18,
                mt: 1,
                color: "#1fd755",
              }}
              defaultValue={rating}
              readOnly
            />
          </Box>
          <p className="product-price">$ {+price * num_travelers}</p>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            fly at : {convertDate(date)}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
            trip members : {num_travelers}
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 4 }}
            color="text.primary"
            fullWidth
            onClick={handelCancel}
          >
            Cancel trip
          </Button>
        </div>
      </div>
    </>
  );
};

export default function AppsSection() {
  const { isPending, data, refetch } = Getdata({
    url: `/users/destination`,
    keyID: "userDestinations",
  });

  const destinations: Iproduct[] = data?.data;

  if (isPending) {
    return <Loader />;
  }
  return (
    <Suspense fallback={<Loader />}>
      <Box className="profile" sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Your ticketes
        </Typography>
        <Grid2 container spacing={2}>
          {destinations.length ? (
            destinations?.map((trip) => (
              <Grid2 size={12} key={trip.trip_id}>
                <Product {...trip} des={refetch} />
              </Grid2>
            ))
          ) : (
            <Box
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                borderRadius: 1,
                mb: 2,
              }}
            >
              <Typography variant="body2" sx={{ textAlign: "center", m: 2 }}>
                No trip found add some trips to shows here.
              </Typography>
            </Box>
          )}
        </Grid2>
      </Box>
    </Suspense>
  );
}
