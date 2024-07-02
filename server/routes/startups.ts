import { FastifyInstance, RouteShorthandOptions } from 'fastify';
import {
  getAllStartups,
  getStartupById,
  addStartup,
  updateStartup,
  deleteStartup,
} from '../db/queries';
import { Startup } from '../models/Startup';

const startupRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/startups', async () => {
    return getAllStartups();
  });

  fastify.get('/startups/:id', async (request) => {
    const { id } = request.params as { id: string };
    const startupId = parseInt(id, 10);
    const startup = await getStartupById(startupId);
    if (!startup) {
      throw new Error('Startup not found');
    }
    return startup;
  });

  fastify.post('/startups', async (request) => {
    const { nome } = request.body as { nome: string };
    const id = await addStartup(nome);
    return { id };
  });

  fastify.put('/startups/:id', async (request) => {
    const { id } = request.params as { id: string };
    const startupId = parseInt(id, 10);
    const { nome } = request.body as { nome: string };
    await updateStartup(startupId, nome);
    return { success: true };
  });

  fastify.delete('/startups/:id', async (request) => {
    const { id } = request.params as { id: string };
    const startupId = parseInt(id, 10);
    await deleteStartup(startupId);
    return { success: true };
  });
};

export default startupRoutes;
