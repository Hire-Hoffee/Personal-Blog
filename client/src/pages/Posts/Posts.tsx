import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPosts } from "@/store/slices/postSlice";
import { RootState } from "@/store";
import { Typography, CircularProgress, Box, Button } from "@mui/material";
import { PostsData } from "@/types";
import Post from "@/components/Post";
import ModalInfo from "@/components/ModalInfo";
import CreatePost from "@/components/CreatePost";
import * as SC from "./Posts.style";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state: RootState) => state.posts);
  const userId = useAppSelector((state: RootState) => state.auth.user?.id);
  const [open, setOpen] = useState(false);
  const navigation = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box p={2}>
        <Typography variant="h4" textAlign={"center"} marginY={"20px"} fontWeight={"bold"}>
          "Личный Блог"
        </Typography>
        <Box display="flex" justifyContent="center" gap={"20px"}>
          {userId && (
            <Button
              variant="contained"
              color="primary"
              sx={{ marginBottom: "20px" }}
              onClick={() => setOpen(true)}
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
        {posts.length > 0 ? (
          <SC.Container>
            {posts.map((post: PostsData) => (
              <Post post={post} key={post.id} />
            ))}
          </SC.Container>
        ) : (
          <Typography variant="h6" textAlign={"center"} marginY={"20px"}>
            Постов нет
          </Typography>
        )}
      </Box>
      <ModalInfo open={open} handleClose={() => setOpen(false)}>
        <CreatePost onClose={() => setOpen(false)} />
      </ModalInfo>
    </>
  );
};

export default Posts;
