import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchPosts } from "@/store/slices/postSlice";
import { Typography, CircularProgress, Box } from "@mui/material";
import { PostsData } from "@/types";
import Post from "@/components/Post";
import ModalInfo from "@/components/ModalInfo";
import CreatePost from "@/components/CreatePost";
import * as SC from "./Posts.style";
import Header from "@/components/Header";

const Posts = () => {
  const dispatch = useAppDispatch();
  const { posts, loading } = useAppSelector((state) => state.posts);
  const [open, setOpen] = useState(false);

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
        <Header handleModal={() => setOpen(true)} />
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
