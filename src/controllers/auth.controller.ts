import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma';

const prismaClient = prisma;

export async function register(req: Request, res: Response) {
  const { email, password } = req.body;

  const exists = await prismaClient.user.findUnique({ where: { email } });
  if (exists) {
    res.status(400).json({ message: 'Email já cadastrado' });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prismaClient.user.create({
    data: { email, password: hashed },
  });

  res.status(201).json({ id: user.id, email: user.email });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await prismaClient.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: 'Credenciais inválidas' });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).json({ message: 'Credenciais inválidas' });
    return;
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  res.json({ token });
}
