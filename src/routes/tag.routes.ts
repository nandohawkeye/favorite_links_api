import { Router } from 'express';
import {
  getTags,
  createTag,
  updateTag,
  deleteTag,
} from '../controllers/tag.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Listar tags do usuário
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tags
 *       401:
 *         description: Não autorizado
 */
router.get('/', getTags);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Criar nova tag
 *     tags: [Tags]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *                 nullable: true
 *               icon:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Tag criada com sucesso
 *       400:
 *         description: Tag já cadastrada
 *       401:
 *         description: Não autorizado
 */
router.post('/', createTag);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Atualizar tag
 *     tags: [Tags]
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
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *                 nullable: true
 *               icon:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Tag atualizada
 *       404:
 *         description: Tag não encontrada
 *       401:
 *         description: Não autorizado
 */
router.put('/:id', updateTag);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Deletar tag
 *     tags: [Tags]
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
 *         description: Tag deletada
 *       404:
 *         description: Tag não encontrada
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', deleteTag);

export default router;
