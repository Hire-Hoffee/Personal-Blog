import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Posts from "@/pages/Posts/Posts";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUserId, resetError as resetAuthError } from "@/store/slices/authSlice";
import { resetError as resetPostsError } from "./store/slices/postSlice";
import Notification from "./components/Notification";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);
  const errorAuth = useAppSelector((state) => state.auth.error);
  const errorPosts = useAppSelector((state) => state.posts.error);
  const [openNotification, setOpenNotification] = useState(false);
  const navigation = useNavigate();

  const handleExit = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigation("/login");
  };

  useEffect(() => {
    if (errorPosts === "Invalid token") {
      handleExit();
    }
    if (errorAuth || errorPosts) {
      setOpenNotification(true);
    }
  }, [errorAuth, errorPosts]);

  const handleClose = () => {
    setOpenNotification(false);
    setTimeout(() => {
      dispatch(resetAuthError());
      dispatch(resetPostsError());
    }, 100);
  };

  useEffect(() => {
    if (!userId && localStorage.getItem("userId")) {
      dispatch(setUserId(localStorage.getItem("userId")));
    }
  }, [userId, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Notification
        open={openNotification}
        onClose={handleClose}
        message={errorAuth || errorPosts}
      />
    </>
  );
};

export default App;
