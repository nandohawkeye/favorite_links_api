import request from 'supertest';
import { Server } from 'http';
import app from '../app';

let server: Server;

beforeAll(() => {
  server = app.listen(0); // porta aleatória
});

afterAll((done) => {
  server.close(done);
});

describe('Auth routes', () => {
  describe('POST /auth/register', () => {
    it('should be register a new user', async () => {
      const res = await request(server)
        .post('/auth/register')
        .send({
          email: `test${Date.now()}@email.com`,
          password: '123456',
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('email');
    });

    it('shound be return 400 code on email has created', async () => {
      const email = `test${Date.now()}@email.com`;

      await request(server)
        .post('/auth/register')
        .send({ email, password: '123456' });
      const res = await request(server)
        .post('/auth/register')
        .send({ email, password: '123456' });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email já cadastrado');
    });
  });

  describe('POST /auth/login', () => {
    it('should be return token on login', async () => {
      const email = `test${Date.now()}@email.com`;
      await request(server)
        .post('/auth/register')
        .send({ email, password: '123456' });

      const res = await request(server)
        .post('/auth/login')
        .send({ email, password: '123456' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('shound be return a 401 code on invalid credentials', async () => {
      const res = await request(server).post('/auth/login').send({
        email: 'naoexiste@email.com',
        password: 'senhaerrada',
      });

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Credenciais inválidas');
    });
  });
});
