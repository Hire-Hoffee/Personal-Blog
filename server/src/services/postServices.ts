import prisma from "@/utils/prismaClient";

export const getAllPosts = async () => {
  return await prisma.post.findMany({
    include: {
      author: {
        select: { username: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createNewPost = async (userId: number, content: string, media: string | null) => {
  return await prisma.post.create({
    data: {
      content,
      media,
      authorId: userId,
    },
    include: {
      author: {
        select: { username: true },
      },
    },
  });
};

export const updateExistingPost = async (
  postId: number,
  userId: number,
  content: string,
  media: string | null
) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post || post.authorId !== userId) {
    throw new Error("Forbidden");
  }

  return await prisma.post.update({
    where: { id: postId },
    data: { content, media },
  });
};

export const deleteExistingPost = async (postId: number, userId: number) => {
  const post = await prisma.post.findUnique({ where: { id: postId } });
  if (!post || post.authorId !== userId) {
    throw new Error("Forbidden");
  }

  return await prisma.post.delete({ where: { id: postId } });
};
