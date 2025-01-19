import * as yup from "yup";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/ogg"];
const ALLOWED_FILE_TYPES = [...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES];

export const postSchema = yup.object().shape({
  content: yup
    .string()
    .trim()
    .required("Сообщение обязательно.")
    .max(500, "Сообщение не должно превышать 500 символов."),
  media: yup
    .mixed<File>()
    .test(
      "fileType",
      "Файл должен быть изображением или видео.",
      (value) => !value || ALLOWED_FILE_TYPES.some((type) => value.type === type)
    )
    .test("fileSize", "Размер изображения не должен превышать 5 МБ, а видео — 20 МБ.", (value) => {
      if (!value) return true;
      if (ALLOWED_IMAGE_TYPES.includes(value.type)) {
        return value.size <= 5 * 1024 * 1024;
      }
      if (ALLOWED_VIDEO_TYPES.includes(value.type)) {
        return value.size <= 20 * 1024 * 1024;
      }
      return false;
    }),
});

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Имя пользователя обязательно.")
      .min(3, "Имя пользователя должно содержать минимум 3 символа.")
      .max(20, "Имя пользователя не должно превышать 20 символов."),
    password: yup
      .string()
      .required("Пароль обязателен.")
      .min(6, "Пароль должен содержать минимум 6 символов.")
      .max(50, "Пароль не должен превышать 50 символов."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли должны совпадать.") // убрали null
      .required("Подтверждение пароля обязательно."),
  })
  .required();

export const loginSchema = yup
  .object({
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
  })
  .required();
