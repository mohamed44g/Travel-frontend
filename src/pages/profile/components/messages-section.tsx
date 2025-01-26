/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { ApiResponse, Getdata } from "../../../apis/destenation";
import Loader from "../../../compenant/Loader";
import toast from "react-hot-toast";
import { convertDate } from "../../../utils/convertTohumandate";
import axiosInstance, { AxiosError } from "../../../config/axois.config";
import { Suspense } from "react";

interface Comment {
  comment_id: number; // Unique identifier for the comment
  content: string; // The content of the comment
  created_at: string; // The timestamp when the comment was created (ISO format)
  rate: string; // Rating provided, stored as a string
  name: string; // Name of the commenter
  trip_name: string; // Name of the trip associated with the comment
}

export default function MessagesSection() {
  const { isPending, error, data, refetch } = Getdata<ApiResponse>({
    url: `/users/comment`,
    keyID: "userComment",
  });

  const comments = data?.data;

  console.log(comments);

  const handelclick = async (commentId: number) => {
    const load = toast.loading("deleting your comment...");
    try {
      await axiosInstance.delete(
        `/users/comment?commentId=${Number(commentId)}`
      );

      refetch();

      toast.dismiss(load);
    } catch (error: unknown) {
      toast.error("Failed to delete comment.");
    }
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Box sx={{ p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Your comments
        </Typography>
        <List sx={{ bgcolor: "background.paper", borderRadius: 1, mb: 2 }}>
          {comments.length ? (
            comments?.map((comment: Comment) => (
              <ListItem key={comment?.comment_id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={"m"} src={`/`} />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.name}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {comment.content}
                      </Typography>
                      {` — ${convertDate(comment.created_at)}`}
                    </>
                  }
                />

                <ListItemAvatar>
                  <IconButton onClick={() => handelclick(comment.comment_id)}>
                    <DeleteOutline />
                  </IconButton>
                </ListItemAvatar>
              </ListItem>
            ))
          ) : (
            <Typography sx={{ textAlign: "center", m: 2 }}>
              Add comments to show here
            </Typography>
          )}
        </List>
      </Box>
    </Suspense>
  );
}
