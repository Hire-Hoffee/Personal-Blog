import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Имя пользователя обязательно.")
    .min(3, "Имя пользователя должно содержать минимум 3 символа.")
    .max(20, "Имя пользователя не должно превышать 20 символов."),
  password: yup
    .string()
    .required("Пароль обязателен.")
    .min(8, "Пароль должен содержать минимум 8 символов.")
    .max(50, "Пароль не должен превышать 50 символов."),
});

export const loginSchema = yup.object({
  username: yup.string().required("Имя пользователя обязательно."),
  password: yup.string().required("Пароль обязателен."),
});

export const postSchema = yup.object().shape({
  content: yup
    .string()
    .trim()
    .required("Сообщение обязательно.")
    .max(500, "Сообщение не должно превышать 500 символов."),
});
