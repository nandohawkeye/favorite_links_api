import express, { Request, Response } from 'express';
import 'dotenv/config';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello world' });
});

app.listen(PORT, () => {
  console.log(`Server runnign on http://localhost:${PORT}`);
});
