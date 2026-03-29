import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export async function getTags(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;

    const tags = await prisma.tag.findMany({ where: { userId } });
    res.json(tags);
  } catch {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function createTag(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { name, color, icon } = req.body;

    const exists = await prisma.tag.findUnique({
      where: { name_userId: { name, userId } },
    });
    if (exists) {
      res.status(400).json({ message: 'Tag já cadastrada' });
      return;
    }

    const tag = await prisma.tag.create({
      data: { name, color, icon, userId },
    });

    res.status(201).json(tag);
  } catch {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function updateTag(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const id = req.params['id'] as string;
    const { name, color, icon } = req.body;

    const exists = await prisma.tag.findFirst({ where: { id, userId } });
    if (!exists) {
      res.status(404).json({ message: 'Tag não encontrada' });
      return;
    }

    const tag = await prisma.tag.update({
      where: { id },
      data: { name, color, icon },
    });

    res.json(tag);
  } catch {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export async function deleteTag(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const id = req.params['id'] as string;

    const exists = await prisma.tag.findFirst({ where: { id, userId } });
    if (!exists) {
      res.status(404).json({ message: 'Tag não encontrada' });
      return;
    }

    await prisma.tag.delete({ where: { id } });

    res.status(204).send();
  } catch {
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}
