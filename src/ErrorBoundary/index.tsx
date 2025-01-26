import { Box, Typography } from "@mui/material";
import React, { Component } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// ErrorBoundary class component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error information to an external service (e.g., Sentry, LogRocket)
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when there's an error
      return (
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 200 }} color="error" />
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            Something went wrong. please try again later.
          </Typography>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
