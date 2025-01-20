import { useAppDispatch } from "@/store";
import { login } from "@/store/slices/authSlice";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/utils/validationSchemas";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "all",
  });

  const onSubmit = (data: { username: string; password: string }) => {
    dispatch(login({ username: data.username, password: data.password }));
    navigate("/");
  };

  return (
    <Box
      sx={{
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: "10px",
          border: "1px solid #ccc",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Вход
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Имя пользователя"
            {...register("username")}
            fullWidth
            margin="normal"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Пароль"
            type="password"
            {...register("password")}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Box display={"flex"} gap={"20px"} marginTop={"20px"}>
            <Button variant="contained" color="primary" type="submit">
              Войти
            </Button>
            <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
              Зарегистрироваться
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
