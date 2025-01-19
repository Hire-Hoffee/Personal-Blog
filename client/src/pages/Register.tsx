import { useAppDispatch } from "@/store";
import { register } from "@/store/slices/authSlice";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/utils/validationSchemas";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "all",
  });

  const onSubmit = (data: { username: string; password: string }) => {
    dispatch(register({ username: data.username, password: data.password }));
    navigate("/login");
  };

  return (
    <Box
      sx={{
        margin: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Box width={"320px"}>
        <Typography variant="h4" gutterBottom>
          Зарегистрироваться
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Имя пользователя"
            {...formRegister("username")}
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Пароль"
            type="password"
            {...formRegister("password")}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Подтверждение пароля"
            type="password"
            {...formRegister("confirmPassword")}
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
          <Box display={"flex"} gap={"20px"} marginTop={"20px"}>
            <Button variant="contained" color="primary" type="submit">
              Зарегистрироваться
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate("/login")}>
              Войти
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
