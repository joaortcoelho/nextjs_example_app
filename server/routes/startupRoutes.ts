import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getAll, getById, add, update, remove } from '../controllers/mainController';
import { Startup } from '../models/Startup';
import favoritosRoutes from './favoritosRoutes';

const startupRoutes = async (fastify: FastifyInstance) => {
  const table = 'startup';

  fastify.get('/startups', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      fastify.log.info('Fetching all startups');
      const startups: Startup[] = await getAll<Startup>(table);
      return startups;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch startups' });
    }
  });

  fastify.get('/startups/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const startupId = parseInt(id, 10);

    try {
      const startup: Startup | undefined = await getById<Startup>(table, startupId);
      if (!startup) {
        reply.status(404).send({ error: 'Startup not found' });
        return;
      }
      return startup;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch startup' });
    }
  });

  fastify.post('/startups', async (request: FastifyRequest, reply: FastifyReply) => {
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
      reply.status(500).send({ error: 'Failed to add startup' });
    }
  });

  fastify.put('/startups/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const startupId = parseInt(id, 10);
    const { nome } = request.body as { nome: string };

    if (!nome) {
      reply.status(400).send({ error: 'Name is required' });
      return;
    }

    try {
      await update(table, startupId, { nome });
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to update startup' });
    }
  });

  fastify.delete('/startups/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const startupId = parseInt(id, 10);

    try {
      await remove("favoritos", startupId); // remove fk first
      await remove(table, startupId);
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to delete startup' });
    }
  });
};

export default startupRoutes;
