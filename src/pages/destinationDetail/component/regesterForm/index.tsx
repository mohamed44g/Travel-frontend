/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useActionState, useEffect } from "react";
import axiosInstance from "../../../../config/axois.config";
import toast from "react-hot-toast";

interface Istate {
  errors: { [key: string]: string };
  success: boolean;
  message: string;
  id?: number | undefined;
  update?: () => void;
}

const initialState: Istate = {
  errors: {},
  success: false,
  message: "",
};

async function HandelbookingAction(_state: Istate, formData: FormData) {
  "use server";

  const traveler = formData.get("traveler");
  const tripId = formData.get("tripId");
  if (Number(traveler) == 0) {
    toast.error("Please select number of travelers");
    return {
      errors: { traveler: "Please select a traveler" },
      success: false,
      message: "Please select number of travelers",
    };
  }

  try {
    const resuilt = await axiosInstance.post("/destination/booking", {
      tripId: Number(tripId),
      travelers: Number(traveler),
    });

    return {
      errors: {},
      success: true,
      message: "Booking successful",
    };
  } catch (error: any) {
    return {
      errors: error,
      message: error.message,
      success: false,
    };
  }
}

export default function Index({
  availableTickets,
  id,
  update,
  price,
}: {
  availableTickets: number;
  id: number;
  update: () => void;
  price: number;
}) {
  const [state, formAction, isPending] = useActionState(
    HandelbookingAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    }
    update();
  }, [state, update]);

  return (
    <>
      <Stack direction={"row"}>
        <Typography sx={{ mt: 1, mb: 2 }}>Ticket avaliable: </Typography>
        <Typography sx={{ mt: 1, ml: 1, color: "primary.main" }}>
          {availableTickets}
        </Typography>
      </Stack>
      <form action={formAction}>
        <TextField
          fullWidth
          id="outlined-disabled"
          disabled
          defaultValue="trip date is : 25-2-2025"
          name="date"
          sx={{ mt: 1 }}
        />

        <TextField
          id="outlined-hidden"
          type="hidden"
          name="tripId"
          value={id}
          sx={{ display: "none" }}
        />

        <Select
          fullWidth
          name="traveler"
          displayEmpty
          sx={{ mt: 2 }}
          defaultValue={"0"}
        >
          <MenuItem value="0" selected>
            Select number of traveler
          </MenuItem>
          {Array.from({ length: 6 }).map((ele, index) => {
            return (
              <MenuItem key={index} value={index + 1}>
                {index + 1} Person
              </MenuItem>
            );
          })}
        </Select>

        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            m: 1,
            mt: 2,
          }}
        >
          <Typography>Price: </Typography>
          <Typography>{price}$</Typography>
        </Stack>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          type="submit"
          disabled={isPending}
        >
          Book Now
        </Button>
      </form>
    </>
  );
}
