/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Container,
  Grid2,
  Pagination,
  Rating,
  Stack,
} from "@mui/material";
import "./index.scss";
import PlaceIcon from "@mui/icons-material/Place";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../compenant/Loader";
import { ApiResponse, Getdata } from "../../apis/destenation";
import { Link } from "react-router-dom";

interface Iproduct {
  id: number;
  image: string;
  name: string;
  price: number;
  old_price: number;
  country: string;
  rating: number;
}

const Product = ({
  id,
  image,
  name,
  price,
  old_price,
  country,
  rating,
}: Iproduct) => {
  return (
    <>
      <Box className="product">
        <Box className="product-content">
          <Box className="product-img">
            <Box className="product-img-overlay"></Box>
            <img src={image} alt="product image" loading="lazy" />
          </Box>
          <Box className="product-btns">
            <button type="button" className="btn-cart">
              add to cart
              <span>
                <i className="fas fa-plus"></i>
              </span>
            </button>
            <Link to={`${id}`}>
              <button type="button" className="btn-buy">
                Details
              </button>
            </Link>
          </Box>
        </Box>

        <Box className="product-info">
          <a href="#" className="product-name">
            {name}
          </a>

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
            <span>{country}</span>
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
          <p className="product-price">$ {old_price}</p>
          <p className="product-price">$ {price}</p>
        </Box>
      </Box>
    </>
  );
};

const Destination = () => {
  const [page, setPage] = useState(1);
  const { isPending, error, data, refetch } = Getdata<ApiResponse>({
    url: `/destination?page=${page}`,
    keyID: "destination",
  });

  const handleChange = async (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  if (isPending) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Container>
        <Grid2
          container
          spacing={6}
          justifyContent="center"
          alignItems="center"
        >
          {data?.data[0]?.map((item: Iproduct) => (
            <Grid2
              key={item.id}
              size={{ xs: 11, sm: 6, md: 5, lg: 4 }}
              justifyContent="center"
              alignItems="center"
            >
              <Product
                id={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                old_price={item.old_price || 1000}
                country={item.country}
                rating={item.rating}
              />
            </Grid2>
          ))}
        </Grid2>

        <Stack
          sx={{ justifyContent: "center", alignItems: "center", mt: 11, mb: 5 }}
        >
          <Pagination count={7} page={page} onChange={handleChange} />
        </Stack>
      </Container>
    </Suspense>
  );
};

export default function Index() {
  return (
    <>
      <Destination />
    </>
  );
}
