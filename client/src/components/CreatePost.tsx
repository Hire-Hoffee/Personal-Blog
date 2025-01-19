import { useAppDispatch } from "@/store";
import { createPost } from "@/store/slices/postSlice";
import PostForm from "./PostForm";

const CreatePost = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: { content: string; media?: File }) => {
    dispatch(createPost({ content: data.content, media: data.media || undefined }));
    onClose();
  };

  return (
    <PostForm
      defaultValues={{ content: "", media: undefined }}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Создать пост"
    />
  );
};

export default CreatePost;
