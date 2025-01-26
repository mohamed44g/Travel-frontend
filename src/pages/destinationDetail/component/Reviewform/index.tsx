/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField, Typography, Button, Box, Stack } from "@mui/material";
import { Suspense, useState } from "react";
import RateControlled from "../../../../compenant/Rating";
import { ApiResponse, Getdata } from "../../../../apis/destenation";
import Review from "../../../../compenant/comment";
import toast from "react-hot-toast";
import axiosInstance from "../../../../config/axois.config";
import Loader from "../../../../compenant/Loader";
import { convertDate } from "../../../../utils/convertTohumandate";

interface Icomment {
  comment_id: number;
  content: string;
  created_at: string;
  rate: string;
  trip_name: string;
  user_name: string;
}

export default function Index({ id }: { id: number }) {
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");

  const { isPending, refetch, data } = Getdata<ApiResponse>({
    url: `/destination/comment?tripId=${id}`,
    keyID: "comments",
  });

  const commentsData = data;

  if (isPending) {
    return <Loader />;
  }

  const handleChange = (e: React.ChangeEvent<unknown>, newValue: number) => {
    setValue(newValue);
  };

  const handelcomment = async () => {
    if (!comment || !value) {
      toast.error("type your comment and rate to submit.");
    } else {
      try {
        await axiosInstance.post("/destination/comment", {
          comment,
          rate: value,
          tripId: id,
        });
        setComment("");
        setValue(0);
        refetch();
      } catch (error) {
        toast.error("Failed to add comment.");
      }
    }
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Typography variant="h5" sx={{ m: { xs: 1, md: 2 } }}>
          Reviews Scores and Score Breakdown
        </Typography>

        <TextField
          id="outlined-multiline-static"
          label="Comment"
          fullWidth
          multiline
          variant="outlined"
          sx={{
            width: { xs: "100%", md: "61%" },
            m: { xs: 1, md: 2 },
            mt: { xs: 5 },
          }}
          minRows={2}
          maxRows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            m: { xs: 1, md: 2 },
            mb: { xs: 5 },
            width: { xs: "100%", md: "61%" },
          }}
        >
          <Stack
            direction={"row"}
            sx={{ alignItems: "center", mt: { xs: 0, md: 0 } }}
          >
            <Typography component="h6" sx={{ mr: 1 }}>
              Your rate:
            </Typography>
            <RateControlled value={value} onchange={handleChange} />
          </Stack>

          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 0,
              justifySelf: "end",
              backgroundColor: "#1fd755",
            }}
            onClick={handelcomment}
          >
            submit
          </Button>
        </Stack>

        <hr style={{ margin: 10, opacity: 0.2 }} />
        <Box className="destination-comments">
          {commentsData?.data.map((comment: Icomment, index: number) => (
            <Review
              key={index}
              name={comment.user_name}
              date={convertDate(comment.created_at)}
              rating={Number(comment.rate)}
              comment={comment.content}
              avatarUrl="/path-to-avatar.jpg"
            />
          ))}
        </Box>
      </Suspense>
    </>
  );
}
