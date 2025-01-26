import * as React from "react";
import { useParams } from "react-router-dom";
import { ApiResponse, Getdata } from "../../apis/destenation";
import Loader from "../../compenant/Loader";
import { Box, Container, Typography } from "@mui/material";
import "./index.scss";
import BasicTabs from "../../compenant/tabs";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
const Reviewform = React.lazy(() => import("./component/Reviewform"));
const Information = React.lazy(() => import("./component/information"));
const Regesterform = React.lazy(() => import("./component/regesterForm"));
const Timeline = React.lazy(() => import("./component/Timeline"));

interface Iproduct {
  id: number;
  image: string;
  name: string;
  price: number;
  old_price: number;
  country: string;
  rating: number;
  description: string;
  category: string;
  location: string;
  time: string;
  date: string;
  availableTickets: number;
}

export default function Index() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { isPending, error, refetch, data } = Getdata<ApiResponse>({
    url: `/destination/${id}`,
    keyID: "destinationData",
    options: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnMount: true,
    },
  });

  const destination: Iproduct = data?.data;

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: "destinationData",
      });
    };
  }, [queryClient]);

  if (isPending) return <Loader />;
  if (error) return toast.error(error.message);
  return (
    <>
      <Box className="destination-img-container">
        <img
          src={`${destination.image.split("?")[0]}?q=90`}
          className="destination-img"
          loading="lazy"
        />
        <Box className="overlay"></Box>
        <Box
          className="destination-title"
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "Satisfy, cursive",
            }}
          >
            Amazing Tour
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontWeight: 600,
            }}
          >
            {destination.name}
          </Typography>
        </Box>
      </Box>

      <Container className="destination-details-container">
        <Box className="destination-details-taps">
          <BasicTabs>
            <Box className="destination-information">
              <Information destenation={destination} />
            </Box>
            <Box className="destination-timeline">
              <Timeline day={+destination.time.split(" ")[0]}></Timeline>
            </Box>
            <Box
              className="destination-reviews"
              sx={{ width: { xs: "100%", md: "80%" } }}
            >
              <Reviewform id={Number(id)} />
            </Box>

            <Box
              className="destination-reviews"
              sx={{ width: { xs: "100%", md: "35%" } }}
            >
              <Regesterform
                availableTickets={destination.availableTickets}
                id={Number(id)}
                update={refetch}
                price={destination.price}
              />
            </Box>
          </BasicTabs>
        </Box>
      </Container>
    </>
  );
}
