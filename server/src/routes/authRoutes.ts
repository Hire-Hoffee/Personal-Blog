import express from "express";
import { register, login } from "@/controllers/authController";
import { validateBody } from "@/middlewares/validationMiddleware";
import { registerSchema, loginSchema } from "@/utils/validationSchemas";

const router = express.Router();
router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);

export default router;
