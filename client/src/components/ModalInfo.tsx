import { Box, Modal } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
};

function ModalInfo({ open, handleClose, children }: Props) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
}

export default ModalInfo;
