import { useAppSelector, RootState } from "@/store";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  handleModal: () => void;
};

function Header({ handleModal }: Props) {
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const navigation = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <Box>
      <Typography variant="h4" textAlign={"center"} marginY={"20px"} fontWeight={"bold"}>
        Личный Блог
      </Typography>
      <Box display="flex" justifyContent="center" gap={"20px"}>
        {userId && (
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: "20px" }}
            onClick={handleModal}
          >
            Создать пост
          </Button>
        )}
        <Button
          variant="contained"
          color="warning"
          sx={{ marginBottom: "20px" }}
          onClick={userId ? handleExit : () => navigation("/login")}
        >
          {userId ? "Выйти" : "Войти"}
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
