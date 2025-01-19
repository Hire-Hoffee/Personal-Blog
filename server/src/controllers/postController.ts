import { Request, Response } from "express";
import prisma from "@/utils/prismaClient";

export const getPosts = async (req: Request, res: Response) => {
  /**  
    #swagger.summary = 'Получение всех постов'
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Posts' }
    }
    #swagger.responses[500] = {
      schema: { message: "Ошибка получения записей" }
    }
  */
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { username: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка получения записей" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  /**  
    #swagger.summary = 'Создание поста'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              content: { type: 'string' },
              media: { type: 'file', format: 'binary' }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      schema: { $ref: '#/definitions/Post' }
    }
    #swagger.responses[500] = {
      schema: { message: "Ошибка создания поста" }
    }
  */
  try {
    const { content } = req.body;
    const userId = req.user.id;
    const filename = req.file ? `${req.user.id}_${req.file?.originalname}` : null;

    const post = await prisma.post.create({
      data: {
        content,
        media: filename,
        authorId: userId,
      },
      include: {
        author: {
          select: { username: true },
        },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка создания поста" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  /**  
    #swagger.summary = 'Обновление поста'
    #swagger.consumes = ['multipart/form-data']
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.requestBody = {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              content: { type: 'string' },
              media: { type: 'file', format: 'binary' }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      schema: { $ref: '#/definitions/Post' }
    }
    #swagger.responses[403] = {
      schema: { message: "У вас нет прав для редактирования" }
    }
    #swagger.responses[500] = {
      schema: { message: "Ошибка обновления записи" }
    }
  */
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const filename = req.file ? `${req.user.id}_${req.file?.originalname}` : null;

    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post || post.authorId !== userId) {
      res.status(403).json({ message: "У вас нет прав для редактирования" });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { content, media: filename },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка обновления записи" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  /**  
    #swagger.summary = 'Удаление поста'
    #swagger.security = [{
            "bearerAuth": []
    }]
    #swagger.responses[200] = {
      schema: { message: 1 }
    }
    #swagger.responses[403] = {
      schema: { message: "У вас нет прав для удаления" }
    }
    #swagger.responses[500] = {
      schema: { message: "Ошибка удаления записи" }
    }
  */
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post || post.authorId !== userId) {
      res.status(403).json({ message: "У вас нет прав для удаления" });
      return;
    }

    const result = await prisma.post.delete({ where: { id: parseInt(id) } });

    res.status(200).json({ message: result.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка удаления записи" });
  }
};
