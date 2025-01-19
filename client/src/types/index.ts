export type PostsData = {
  id: number;
  createdAt: Date;
  content: string;
  media?: string | undefined;
  authorId: number;
  author: {
    username: string;
  };
};
