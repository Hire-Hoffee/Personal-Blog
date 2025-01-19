import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Box, Typography } from "@mui/material";
import { postSchema } from "@/utils/validationSchemas";

interface PostFormProps {
  defaultValues: { content: string; media?: File };
  onSubmit: (data: { content: string; media?: File }) => void;
  onClose: () => void;
  title: string;
}

const PostForm = ({ defaultValues, onSubmit, onClose, title }: PostFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(postSchema),
    mode: "all",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <Box display="flex" flexDirection="column" gap="20px">
        <Typography variant="h6">{title}</Typography>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Напишите сообщение"
              fullWidth
              multiline
              rows={4}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
          )}
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || undefined;
            setValue("media", file);
          }}
        />
        {errors.media && (
          <Typography color="error" variant="body2">
            {errors.media.message}
          </Typography>
        )}
        <Box display="flex" gap="10px" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Сохранить
          </Button>
          <Button onClick={onClose} variant="outlined">
            Отмена
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default PostForm;
