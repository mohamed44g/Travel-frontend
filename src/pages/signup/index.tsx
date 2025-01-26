/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// SignUpForm.tsx
"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Box,
  Container,
  Button,
  Typography,
  Paper,
  Grid2,
  InputAdornment,
  IconButton,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import regesterSchema from "../../utils/regesterValdator";
import Joi from "joi";
import axiosInstance from "../../config/axois.config.tsx";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../compenant/customTextfield/index.tsx";

interface Istate {
  errors: { [key: string]: string };
  success: boolean;
  message: string;
}

// Initial state
const initialState: Istate = {
  errors: {},
  success: false,
  message: "",
};

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(
    SignUpAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (state.success) {
      toast.success(
        "signup successfully you will be redirected to login page after 3 seconds"
      );
      setTimeout(() => {
        navigate("/signin");
      }, 3200);
    } else if (Object.keys(state.errors).length !== 0) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Grid2 container>
          <Grid2 size={12}>
            <Paper
              elevation={0}
              sx={{
                width: { sx: "95%", sm: "70%", md: "60%" },
                m: "auto",
                p: 4,
                borderRadius: "16px",
                backgroundColor: "#181818",
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                sx={{
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                Sign Up
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                }}
              >
                Fill the form below to create your account
              </Typography>
              <form action={formAction}>
                <CustomTextField
                  label="Name"
                  name="name"
                  type="text"
                  error={state?.errors?.name}
                />

                <CustomTextField
                  label="Email"
                  name="email"
                  type="email"
                  error={state?.errors?.email}
                />

                <CustomTextField
                  label="Password"
                  name="password"
                  type={showPassword.password ? "text" : "password"}
                  error={state?.errors?.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              password: !prev.password,
                            }))
                          }
                          edge="end"
                        >
                          {showPassword.password ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="gender"
                  sx={{
                    mb: 2,
                    ml: 1,
                  }}
                >
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#1fd755",
                          },
                        }}
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        sx={{
                          "&, &.Mui-checked": {
                            color: "#1fd755",
                          },
                        }}
                      />
                    }
                    label="Male"
                  />
                </RadioGroup>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isPending}
                  sx={{
                    mb: 2,
                    height: "48px",
                    backgroundColor: "#1fd755",
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#1fd755",
                    },
                  }}
                >
                  {isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      style={{
                        color: "#1fd755",
                        fontWeight: 500,
                      }}
                    >
                      Sign in
                    </Link>
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}

// Action
async function SignUpAction(prevState: Istate, formData: FormData) {
  "use server";

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const gender = formData.get("gender");

  // const loadingToast = toast.loading("Registering...");

  try {
    await regesterSchema.validateAsync(
      { name, email, password, gender },
      { abortEarly: false }
    );

    const resuilt = await axiosInstance.post("/users/register", {
      name,
      email,
      password,
      gender,
    });

    return {
      errors: {},
      success: true,
      message: "Successfully signed up!",
    };
  } catch (error: any) {
    if (error instanceof Joi.ValidationError) {
      const errors = error.details.reduce((acc: any, curr) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});

      return {
        errors,
        message: "Please fix the validation errors",
        success: false,
      };
    }

    return {
      errors: error,
      message: error.message,
      success: false,
    };
  }
}
