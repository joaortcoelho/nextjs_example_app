import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getAll, getById, add, update, remove } from '../controllers/mainController';
import { Utilizador } from '../models/Utilizador';

const utilizadorRoutes = async (fastify: FastifyInstance) => {
  const table = 'utilizador';

  fastify.get('/utilizadores', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const utilizadores: Utilizador[] = await getAll<Utilizador>(table);
      return utilizadores;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch utilizadores' });
    }
  });

  fastify.get('/utilizadores/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const utilizadorId = parseInt(id, 10);

    try {
      const utilizador: Utilizador | undefined = await getById<Utilizador>(table, utilizadorId);
      if (!utilizador) {
        reply.status(404).send({ error: 'Utilizador not found' });
        return;
      }
      return utilizador;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch utilizador' });
    }
  });

  fastify.post('/utilizadores', async (request: FastifyRequest, reply: FastifyReply) => {
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
      reply.status(500).send({ error: 'Failed to add utilizador' });
    }
  });

  fastify.put('/utilizadores/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const utilizadorId = parseInt(id, 10);
    const { nome } = request.body as { nome: string };

    if (!nome) {
      reply.status(400).send({ error: 'Name is required' });
      return;
    }

    try {
      await update(table, utilizadorId, { nome });
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to update utilizador' });
    }
  });

  fastify.delete('/utilizadores/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const utilizadorId = parseInt(id, 10);

    try {
      await remove(table, utilizadorId);
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to delete utilizador' });
    }
  });
};

export default utilizadorRoutes;
