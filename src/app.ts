import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';
import authRoutes from './routes/auth.routes';
import linkRoutes from './routes/link.routes';
import tagRoutes from './routes/tag.routes';
import { errorHandler } from './middlewares/erroHandler';

const app = express();

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoutes);
app.use('/links', linkRoutes);
app.use('/tags', tagRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
