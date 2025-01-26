import React from "react";
import { Box, Avatar, Typography, Rating, Stack } from "@mui/material";

interface ReviewProps {
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

const Review: React.FC<ReviewProps> = ({
  name,
  date,
  rating,
  comment,
  avatarUrl,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 5,
        m: { xs: 0, md: 2 },
        mt: { xs: 0, md: 4 },
        p: { xs: 0, md: 2 },
        pt: { xs: 3, md: 2 },
        pb: { xs: 3, md: 2 },
      }}
    >
      <Avatar
        src={avatarUrl}
        alt={name}
        sx={{
          width: { xs: 40, md: 55 },
          height: { xs: 40, md: 55 },
        }}
      />

      <Stack spacing={1} flex={1}>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle2" fontWeight="400">
              {name}
            </Typography>
            <Rating
              value={rating}
              readOnly
              size="small"
              sx={{
                color: "#1fd755",
              }}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: "300",
            }}
          >
            {date}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text"
          sx={{
            lineHeight: 1.6,
            opacity: 0.87,
          }}
        >
          {comment}
        </Typography>
      </Stack>
    </Box>
  );
};

export default Review;
