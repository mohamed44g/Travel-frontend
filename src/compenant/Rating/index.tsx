import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";

export default function Index({
  value,
  onchange,
}: {
  value: number;
  onchange: (e: React.ChangeEvent<unknown>, newValue: number) => void;
}) {
  return (
    <Rating
      sx={{ borderColor: "#fff", color: "#fff" }}
      name="simple-controlled"
      value={value}
      onChange={onchange}
      size="small"
      emptyIcon={<StarBorder sx={{ color: "#fff" }} fontSize="inherit" />}
    />
  );
}
