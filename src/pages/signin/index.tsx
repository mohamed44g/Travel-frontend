/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Joi from "joi";
import axiosInstance from "../../config/axois.config";
import toast from "react-hot-toast";
import loginSchema from "../../utils/loginValdator";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import CustomTextField from "../../compenant/customTextfield";

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

// Action
async function signUpAction(prevState: Istate, formData: FormData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  try {
    await loginSchema.validateAsync({ email, password }, { abortEarly: false });

    const resuilt = await axiosInstance.post("/users/login", {
      email,
      password,
    });

    // add secured accessToken to local storage
    secureLocalStorage.setItem("accessToken", resuilt.data.data.accessToken);

    return {
      errors: {},
      message: "Successfully signed in!",
      success: true,
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

// Main Component
export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState
  );
  const [showPassword, setShowPassword] = useState({
    password: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (state.success) {
      toast.success(
        "signin successfully you will be redirected to login page after 3 seconds"
      );
      setTimeout(() => {
        navigate("/");
      }, 3200);
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
                Sign In
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mb: 4,
                }}
              >
                Fill the form to login to your account
              </Typography>
              <form action={formAction}>
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

                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  disabled={isPending}
                  sx={{
                    mb: 2,
                    mt: 2,
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
                    "Sign In"
                  )}
                </Button>

                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    don't have an account?{" "}
                    <Link
                      to="/signup"
                      style={{
                        color: "#1fd755",
                        fontWeight: 500,
                      }}
                    >
                      Sign up
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
