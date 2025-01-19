import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";
import { deletePost } from "@/store/slices/postSlice";
import { PostsData } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import ModalInfo from "./ModalInfo";
import EditPost from "./EditPost";
import { useState } from "react";
import { memo } from "react";

type Props = {
  post: PostsData;
};

function Post({ post }: Props) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [open, setOpen] = useState(false);

  const isImage = (media: string) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    const extension = media.split(".").pop()?.toLowerCase();
    return extension && imageExtensions.includes(extension);
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          maxWidth: "300px",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" fontWeight={"bold"}>
            {post.author.username}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={"12px"}>
            {new Date(post.createdAt).toLocaleString()}
          </Typography>
          <Box marginTop={"20px"}>
            <Typography variant="body2" color="text.secondary" marginBottom={"5px"}>
              {post.content}
            </Typography>
            {post.media && (
              <Box>
                {isImage(post.media) ? (
                  <img
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    src={`${import.meta.env.VITE_API_URL}/${post.media}`}
                    alt="media"
                  />
                ) : (
                  <video style={{ width: "100%", height: "100%" }} controls>
                    <source
                      src={`${import.meta.env.VITE_API_URL}/${post.media}`}
                      type="video/mp4"
                    />
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                )}
              </Box>
            )}
          </Box>
        </CardContent>
        {userId === post.authorId && (
          <CardActions>
            <Button size="small" color="info" variant="contained" onClick={() => setOpen(true)}>
              Редактировать
            </Button>
            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => dispatch(deletePost(post.id))}
            >
              Удалить
            </Button>
          </CardActions>
        )}
      </Card>
      <ModalInfo open={open} handleClose={() => setOpen(false)}>
        <EditPost onClose={() => setOpen(false)} post={post} />
      </ModalInfo>
    </>
  );
}

export default memo(Post);
