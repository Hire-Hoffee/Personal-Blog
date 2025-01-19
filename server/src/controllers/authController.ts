import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prismaClient";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  /**  
    #swagger.summary = 'Регистрация нового пользователя'
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/Auth" }
    }
    #swagger.responses[200] = {
    schema: { message: "User registered" }
    }
    #swagger.responses[400] = {
    schema: { message: "User already exists" }
    }
  */
  const { username, password }: { username: string; password: string } = req.body;
  const hashedPassword = await bcrypt.hash(password, 7);

  const findUser = await prisma.user.findUnique({ where: { username } });
  if (findUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  res.status(201).json({ message: "User registered" });
};

export const login = async (req: Request, res: Response) => {
  /**  
    #swagger.summary = 'Вход для пользователя'
    #swagger.requestBody = {
        required: true,
        schema: { $ref: "#/definitions/Auth" }
    }
    #swagger.responses[200] = {
    schema: { $ref: "#/definitions/Logged" }
    }
    #swagger.responses[401] = {
    schema: { message: "Invalid credentials" }
    }
  */
  const { username, password } = req.body;

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  res.status(200).json({ token, id: user.id, username: user.username });
};
