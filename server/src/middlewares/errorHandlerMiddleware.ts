import { Request, Response, NextFunction } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Ошибка:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(400).json({
      message: "Превышен допустимый размер файла",
    });
    return;
  }

  if (err instanceof Error) {
    res.status(400).json({
      message: err.message,
    });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({
      message: "Ошибка валидации данных",
      errors: err.errors || [],
    });
    return;
  }

  res.status(500).json({
    message: "Внутренняя ошибка сервера",
  });
};

export default errorHandler;
