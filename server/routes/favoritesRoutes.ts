import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import main from '../controllers/mainController';
import Favorite from '../models/Favorite';

const favoritesRoutes = async (fastify: FastifyInstance) => {
  const table = 'favoritos';

  // GET: all favorites for a specific user
  fastify.get('/utilizadores/:id/favoritos', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    try {
      const favorites: Favorite[] = await main.getAll<Favorite>(table);
      const userFavoritos = favorites.filter(favorite => favorite.id_utilizador === parseInt(id, 10));
      return userFavoritos;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch favoritos for user' });
    }
  });

   // ADD: a favorite for a specific user
  fastify.post('/utilizadores/:id/favoritos/:id2', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id, id2 } = request.params as { id: string; id2: string };

    try {
      await main.addToTable(table, { id_utilizador: parseInt(id, 10), id_startup: parseInt(id2, 10) });
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to add favorito' });
    }
  });

  // DELETE: a favorite for a specific user
  fastify.delete('/utilizadores/:id/favoritos/:id2', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id2 } = request.params as { id2: number };

    try {
      await main.removeFromTable(table, id2);
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to delete favorito' });
    }
  });
};

export default favoritesRoutes;
