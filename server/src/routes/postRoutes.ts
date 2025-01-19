import { Router } from "express";
import { createPost, getPosts, updatePost, deletePost } from "@/controllers/postController";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { upload } from "@/utils/multer";
import { validateBody } from "@/middlewares/validationMiddleware";
import { postSchema } from "@/utils/validationSchemas";

const router = Router();

router.get("/", getPosts);
router.post(
  "/create",
  authMiddleware,
  upload.single("media"),
  validateBody(postSchema),
  createPost
);
router.put(
  "/update/:id",
  authMiddleware,
  upload.single("media"),
  validateBody(postSchema),
  updatePost
);
router.delete("/delete/:id", authMiddleware, deletePost);

export default router;
