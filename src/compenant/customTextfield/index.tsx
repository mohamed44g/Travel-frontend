import { FilledTextFieldProps, OutlinedTextFieldProps, StandardTextFieldProps, TextField, TextFieldVariants } from "@mui/material";
import { JSX } from "react";

const CustomTextField = (
  props: JSX.IntrinsicAttributes & {
    variant?: TextFieldVariants | undefined;
  } & Omit<
      FilledTextFieldProps | OutlinedTextFieldProps | StandardTextFieldProps,
      "variant"
    >
) => {
  return (
    <TextField
      fullWidth
      error={Boolean(props.error)}
      helperText={props.error}
      sx={{
        mb: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "&.Mui-focused fieldset": {
            borderColor: "#1fd755",
            borderWidth: "2px",
          },
          "&:hover fieldset": {
            borderColor: "#1fd755",
          },
          "& fieldset": {
            borderColor: "#e0e0e0",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#666",
          "&.Mui-focused": {
            color: "#fff",
          },
        },
      }}
      {...props}
    />
  );
};

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
