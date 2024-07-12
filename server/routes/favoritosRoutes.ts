import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getAll, getById, add, update, remove } from '../controllers/mainController';
import { Favoritos } from '../models/Favoritos';

const favoritosRoutes = async (fastify: FastifyInstance) => {
  const table = 'favoritos';

  fastify.get('/favoritos', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const favoritos: Favoritos[] = await getAll<Favoritos>(table);
      return favoritos;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch favoritos' });
    }
  });

  fastify.get('/favoritos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const favoritoId = parseInt(id, 10);

    try {
      const favorito: Favoritos | undefined = await getById<Favoritos>(table, favoritoId);
      if (!favorito) {
        reply.status(404).send({ error: 'Favorito not found' });
        return;
      }
      return favorito;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch favorito' });
    }
  });

  fastify.post('/favoritos', async (request: FastifyRequest, reply: FastifyReply) => {
    const { nome } = request.body as { nome: string };

    if (!nome) {
      reply.status(400).send({ error: 'Name is required' });
      return;
    }

    try {
      const id: number = await add(table, { nome });
      return { id };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to add favorito' });
    }
  });

  fastify.put('/favoritos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const favoritoId = parseInt(id, 10);
    const { nome } = request.body as { nome: string };

    if (!nome) {
      reply.status(400).send({ error: 'Name is required' });
      return;
    }

    try {
      await update(table, favoritoId, { nome });
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to update favorito' });
    }
  });

  fastify.delete('/favoritos/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const favoritoId = parseInt(id, 10);

    try {
      await remove(table, favoritoId);
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to delete favorito' });
    }
  });
};

export default favoritosRoutes;
