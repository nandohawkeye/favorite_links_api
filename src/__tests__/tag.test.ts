import request from 'supertest';
import { Server } from 'http';
import app from '../app';

let server: Server;
let token: string;

beforeAll(async () => {
  server = app.listen(0);

  const email = `test${Date.now()}@email.com`;
  await request(server)
    .post('/auth/register')
    .send({ email, password: '123456' });
  const res = await request(server)
    .post('/auth/login')
    .send({ email, password: '123456' });
  token = res.body.token;
});

afterAll((done) => {
  server.close(done);
});

describe('Tag routes', () => {
  describe('POST /tags', () => {
    it('shoud be create a new task', async () => {
      const res = await request(server)
        .post('/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'dev', color: '#FF5733', icon: '1F4BB' });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('dev');
    });

    it('should be return a 400 code for has created tag', async () => {
      const name = `tag${Date.now()}`;

      await request(server)
        .post('/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ name });

      const res = await request(server)
        .post('/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ name });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Tag já cadastrada');
    });

    it('should be return a 401 code, without token', async () => {
      const res = await request(server).post('/tags').send({ name: 'dev' });

      expect(res.status).toBe(401);
    });
  });

  describe('GET /tags', () => {
    it('should be return a tag list for user', async () => {
      const res = await request(server)
        .get('/tags')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should be return a 401 code, without token', async () => {
      const res = await request(server).get('/tags');

      expect(res.status).toBe(401);
    });
  });

  describe('PUT /tags/:id', () => {
    it('should be update a exist tag', async () => {
      const created = await request(server)
        .post('/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: `tag${Date.now()}` });

      const res = await request(server)
        .put(`/tags/${created.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: `tag${Date.now()}updated` });

      expect(res.status).toBe(200);
    });

    it('should be return a 404 code for a non-exist tag', async () => {
      const res = await request(server)
        .put('/tags/id-inexistente')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'teste' });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /tags/:id', () => {
    it('should be delete a exist tag', async () => {
      const created = await request(server)
        .post('/tags')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: `tag${Date.now()}` });

      const res = await request(server)
        .delete(`/tags/${created.body.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(204);
    });

    it('should be return a 404 code for a non-exist tag', async () => {
      const res = await request(server)
        .delete('/tags/id-inexistente')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(404);
    });
  });
});
