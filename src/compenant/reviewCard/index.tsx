import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Rating,
  Avatar,
  Box,
} from "@mui/material";
import { green } from "@mui/material/colors";
import { NearMeDisabledOutlined } from "@mui/icons-material";

const ReviewCard = ({
  name,
  date,
  rate,
  comment,
}: {
  name: string;
  date: string;
  rate: number;
  comment: string;
}) => {
  return (
    <Card
      sx={{
        maxWidth: 450,
        margin: "20px 10px",
        boxShadow: 3,
        borderRadius: 2,
        minHeight: 200,
      }}
    >
      <CardContent>
        {/* Avatar */}
        <Box display="flex" alignItems="center">
          <Avatar
            sx={{
              bgcolor: green[500],
              width: 50,
              height: 50,
              marginRight: 2,
            }}
          >
            {name[0]}
          </Avatar>
          <div>
            <Typography variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {date}
            </Typography>
          </div>
        </Box>

        {/* Rating */}
        <Box display="flex" alignItems="center" marginTop={1}>
          <Rating value={rate} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" marginLeft={1}>
            {rate}
          </Typography>
        </Box>

        {/* Review Text */}
        <Typography variant="body2" color="text.primary" marginTop={2}>
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
