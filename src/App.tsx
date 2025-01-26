import "./assets/style/index.scss";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./router";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from "./compenant/Loader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

let darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#1fd755",
    },

    background: {
      default: "#111111",
      paper: "#1b1b1b",
    },
  },

  typography: {
    fontFamily: "Poppins, serif",
  },
});

darkTheme = responsiveFontSizes(darkTheme);

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={darkTheme}>
            <Router>
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                  duration: 5000,
                  style: {
                    width: 500,
                    background: "#363636",
                    color: "#fff",
                  },
                }}
              />
              <AppRoutes />
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
