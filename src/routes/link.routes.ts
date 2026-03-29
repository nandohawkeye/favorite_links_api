import { Router } from 'express';
import {
  getLinks,
  createLink,
  updateLink,
  deleteLink,
} from '../controllers/link.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /links:
 *   get:
 *     summary: Listar links do usuário
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de links
 *       401:
 *         description: Não autorizado
 */
router.get('/', getLinks);

/**
 * @swagger
 * /links:
 *   post:
 *     summary: Criar novo link
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [url]
 *             properties:
 *               url:
 *                 type: string
 *               title:
 *                 type: string
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Link criado com sucesso
 *       401:
 *         description: Não autorizado
 */
router.post('/', createLink);

/**
 * @swagger
 * /links/{id}:
 *   put:
 *     summary: Atualizar link
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               title:
 *                 type: string
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Link atualizado
 *       404:
 *         description: Link não encontrado
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', updateLink);

/**
 * @swagger
 * /links/{id}:
 *   delete:
 *     summary: Deletar link
 *     tags: [Links]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Link deletado
 *       404:
 *         description: Link não encontrado
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', deleteLink);

export default router;
