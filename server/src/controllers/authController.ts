import { Request, Response } from "express";
import { registerUser, loginUser } from "@/services/authServices";

export const register = async (req: Request, res: Response) => {
  try {
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

    const result = await registerUser(username, password);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
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

    const result = await loginUser(username, password);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};
