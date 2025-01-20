import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/utils/prismaClient";

export const registerUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 7);

  const findUser = await prisma.user.findUnique({ where: { username } });
  if (findUser) {
    throw new Error("User already exists");
  }

  await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  return { message: "User registered" };
};

export const loginUser = async (username: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  return { token, id: user.id, username: user.username };
};
