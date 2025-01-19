import { useAppDispatch } from "@/store";
import { updatePost } from "@/store/slices/postSlice";
import PostForm from "./PostForm";
import { PostsData } from "@/types";

const EditPost = ({ post, onClose }: { post: PostsData; onClose: () => void }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: { content: string; media?: File }) => {
    dispatch(updatePost({ id: post.id, content: data.content, media: data.media }));
    onClose();
  };

  return (
    <PostForm
      defaultValues={{ content: post.content, media: undefined }}
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Редактировать пост"
    />
  );
};

export default EditPost;
