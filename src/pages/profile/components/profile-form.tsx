/* eslint-disable @typescript-eslint/no-unused-vars */
import { useActionState, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid2 as Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ApiResponse, Getdata } from "../../../apis/destenation";
import Loader from "../../../compenant/Loader";
import axiosInstance from "../../../config/axois.config";
import toast from "react-hot-toast";

export default function ProfileForm() {
  const { isPending, error, data, refetch } = Getdata<ApiResponse>({
    url: `/users/profile`,
    keyID: "userProfile",
  });

  const user = data?.data;
  if (isPending) return <Loader />;

  const updateProfile = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const gender = formData.get("gender");
    const phone = formData.get("phone");
    const country = formData.get("country");
    const language = formData.get("language");

    const load = toast.loading("Updating your profile...");

    try {
      await axiosInstance.put(`/users/profile`, {
        name,
        email,
        gender,
        phone,
        country,
        language,
      });
      toast.success("Profile updated successfully!");
      toast.dismiss(load);
      refetch();
    } catch (error) {
      toast.dismiss(load);
      console.log(error);
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <form action={updateProfile}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 6 }}>
          <Avatar
            src={"/path-to-avatar.jpg"}
            alt="A"
            sx={{
              width: { xs: 50, sm: 70 },
              height: { xs: 50, sm: 70 },
              mr: 2,
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" gutterBottom>
              {user?.name}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Update information
          </Button>
        </Box>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="outlined-input"
              defaultValue={user?.name}
              name="name"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              id="outlined-input"
              defaultValue={user?.email}
              name="email"
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Select fullWidth value={user?.gender} displayEmpty name="gender">
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              placeholder="type your phone number"
              defaultValue={user?.phone || ""}
              name="phone"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Select
              fullWidth
              defaultValue={user?.country || ""}
              displayEmpty
              name="country"
            >
              <MenuItem value="">Select Country</MenuItem>
              <MenuItem value="eg">Egypt</MenuItem>
              <MenuItem value="de">Germany</MenuItem>
              <MenuItem value="fr">France</MenuItem>
              <MenuItem value="es">Spain</MenuItem>
              <MenuItem value="us">United States</MenuItem>
              <MenuItem value="uk">United Kingdom</MenuItem>
              <MenuItem value="ca">Canada</MenuItem>
              <MenuItem value="au">Australia</MenuItem>
              <MenuItem value="ie">Ireland</MenuItem>
              <MenuItem value="nz">New Zealand</MenuItem>
              <MenuItem value="sg">Singapore</MenuItem>
              <MenuItem value="my">Malaysia</MenuItem>
              <MenuItem value="ph">Philippines</MenuItem>
            </Select>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Select
              fullWidth
              defaultValue={user?.language || ""}
              name="language"
              displayEmpty
            >
              <MenuItem value="">Select Language</MenuItem>
              <MenuItem value="ar">Arabic</MenuItem>
              <MenuItem value="cn">Chinese</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 4, display: { xs: "block", sm: "none" } }}
        >
          Update information
        </Button>
      </form>
    </Box>
  );
}
