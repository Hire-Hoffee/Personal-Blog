import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validateBody =
  (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(400).json({
        message: "Validation error",
        errors: error.inner.map((err: any) => ({ path: err.path, message: err.message })),
      });
    }
  };
