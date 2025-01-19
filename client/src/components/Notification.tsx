import { Snackbar } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  message?: string | null;
};

function Notification({ open, onClose, message }: Props) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={5000}
      message={message || "Что-то произошло..."}
    />
  );
}

export default Notification;
