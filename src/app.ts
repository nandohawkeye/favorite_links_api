import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/auth.routes';
import linkRoutes from './routes/link.routes';
import tagRoutes from './routes/tag.routes';
import { errorHandler } from './middlewares/erroHandler';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/links', linkRoutes);
app.use('/tags', tagRoutes);

app.use(errorHandler);

export default app;
