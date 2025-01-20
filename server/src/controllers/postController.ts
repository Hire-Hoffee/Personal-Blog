import { Request, Response } from "express";
import {
  getAllPosts,
  createNewPost,
  updateExistingPost,
  deleteExistingPost,
} from "@/services/postServices";

export const getPosts = async (req: Request, res: Response) => {
  try {
    /**  
      #swagger.summary = 'Получение всех постов'
      #swagger.responses[200] = { schema: { $ref: '#/definitions/Posts' } }
      #swagger.responses[500] = { schema: { message: "Ошибка получения записей" } }
    */
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка получения записей" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    /**  
      #swagger.summary = 'Создание поста'
      #swagger.security = [{ "bearerAuth": [] }]
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
      #swagger.responses[201] = { schema: { $ref: '#/definitions/Post' } }
      #swagger.responses[500] = { schema: { message: "Ошибка создания поста" } }
    */
    const { content } = req.body;
    const userId = req.user.id;
    const filename = req.file ? `${req.user.id}_${req.file.originalname}` : null;

    const post = await createNewPost(userId, content, filename);
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка создания поста" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    /**  
      #swagger.summary = 'Обновление поста'
      #swagger.consumes = ['multipart/form-data']
      #swagger.security = [{ "bearerAuth": [] }]
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
      #swagger.responses[200] = { schema: { $ref: '#/definitions/Post' } }
      #swagger.responses[403] = { schema: { message: "У вас нет прав для редактирования" } }
      #swagger.responses[500] = { schema: { message: "Ошибка обновления записи" } }
    */
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const filename = req.file ? `${req.user.id}_${req.file.originalname}` : null;

    const updatedPost = await updateExistingPost(parseInt(id), userId, content, filename);
    res.status(200).json(updatedPost);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Forbidden") {
        res.status(403).json({ message: "У вас нет прав для редактирования" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Ошибка обновления записи" });
      }
    }
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    /**  
      #swagger.summary = 'Удаление поста'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.responses[200] = { schema: { message: 1 } }
      #swagger.responses[403] = { schema: { message: "У вас нет прав для удаления" } }
      #swagger.responses[500] = { schema: { message: "Ошибка удаления записи" } }
    */
    const { id } = req.params;
    const userId = req.user.id;

    const result = await deleteExistingPost(parseInt(id), userId);
    res.status(200).json({ message: result.id });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Forbidden") {
        res.status(403).json({ message: "У вас нет прав для удаления" });
      } else {
        console.error(error);
        res.status(500).json({ message: "Ошибка удаления записи" });
      }
    }
  }
};
