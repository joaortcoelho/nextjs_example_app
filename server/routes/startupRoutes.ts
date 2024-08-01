import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import main from '../controllers/mainController';
import user from '../controllers/userController';
import Startup from '../models/Startup';

const startupRoutes = async (fastify: FastifyInstance) => {
  const table = 'startup';

  // GET: startups
  fastify.get(
    '/startups',
    { preHandler: user.authenticateTokenVerifier },
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        fastify.log.info('Fetching all startups');
        const startups: Startup[] = await main.getAll<Startup>(table);
        return startups;
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Failed to fetch startups' });
      }
    }
  );

  // GET: get startup by id
  fastify.get(
    '/startups/:id',
    { preHandler: user.authenticateTokenVerifier },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id: startupId } = request.params as { id: string };

      try {
        const startup = await main.getByParam<Startup>(table, 'id', startupId);
        if (!startup) {
          reply.status(404).send({ error: 'Startup not found' });
          return;
        }
        return startup;
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Failed to fetch startup' });
      }
    }
  );

  // POST: add startup
  fastify.post('/startups', { preHandler: user.isUserAdmin }, async (request: FastifyRequest, reply: FastifyReply) => {
    const { nome } = request.body as { nome: string };

    if (!nome) {
      reply.status(400).send({ error: 'Name is required' });
      return;
    }

    try {
      const id: number = await main.addToTable(table, { nome });
      return { id };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to add startup' });
    }
  });

  // PUT: update startup name by id
  fastify.put(
    '/startups/:id',
    { preHandler: user.isUserAdmin },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const startupId = parseInt(id, 10);
      const { nome } = request.body as { nome: string };

      if (!nome) {
        reply.status(400).send({ error: 'Name is required' });
        return;
      }

      try {
        await main.updateInTable(table, startupId, { nome });
        return { success: true };
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Failed to update startup' });
      }
    }
  );

  // DELETE: delete startup by id
  fastify.delete(
    '/startups/:id',
    { preHandler: user.isUserAdmin },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id } = request.params as { id: string };
      const startupId = parseInt(id, 10);

      try {
        await main.removeFromTable('favoritos', startupId); // remove fk first
        await main.removeFromTable(table, startupId);
        return { success: true };
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Failed to delete startup' });
      }
    }
  );
};

export default startupRoutes;
