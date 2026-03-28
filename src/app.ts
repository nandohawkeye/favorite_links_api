import express from 'express';
import 'dotenv/config';
import authRoutes from './routes/auth.routes';
import linkRoutes from './routes/link.routes';

const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/links', linkRoutes);

export default app;
