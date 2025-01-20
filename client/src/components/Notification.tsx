import { Alert, Snackbar } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  message?: string | null;
};

function Notification({ open, onClose, message }: Props) {
  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={5000}>
      <Alert onClose={onClose} severity="error" variant="filled" sx={{ width: "100%" }}>
        {message || "Что-то произошло..."}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
