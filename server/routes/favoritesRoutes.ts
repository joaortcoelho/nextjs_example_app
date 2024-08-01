import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import main from '../controllers/mainController';
import user from '../controllers/userController';
import Favorite from '../models/Favorite';

const favoritesRoutes = async (fastify: FastifyInstance) => {
  const table = 'favoritos';

  // GET: all favorites for a specific user
  fastify.get(
    '/utilizadores/:id/favoritos',
    { preHandler: user.isUserAuthorizedToTakeAction },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id: id_utilizador } = request.params as { id: string };

      try {
        const userFavorites: unknown = await main.getByParam<Favorite[]>(table, 'id_utilizador', id_utilizador);
        if (!userFavorites) {
          reply.status(404).send({ error: 'User favorites not found' });
          return;
        }
        return userFavorites;
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Failed to fetch favoritos for user' });
      }
    }
  );

  // ADD: a favorite for a specific user
  fastify.post(
    '/utilizadores/:id/favoritos/:id2',
    { preHandler: user.isUserAuthorizedToTakeAction },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id, id2 } = request.params as { id: string; id2: string };
      // id: id_utilizador, id2: id_startup
      try {
        await main.addToTable(table, {
          id_utilizador: parseInt(id, 10),
          id_startup: parseInt(id2, 10),
        });
        return { success: true };
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Failed to add favorite' });
      }
    }
  );

  // DELETE: a favorite for a specific user
  fastify.delete(
    '/utilizadores/:id/favoritos/:id2',
    { preHandler: user.isUserAuthorizedToTakeAction },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { id2 } = request.params as { id2: number };

      try {
        await main.removeFromTable(table, id2);
        return { success: true };
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({ error: 'Failed to delete favorite' });
      }
    }
  );
};

export default favoritesRoutes;
