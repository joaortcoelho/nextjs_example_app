import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getAll, getById, addToTable, updateInTable, removeFromTable } from '../controllers/mainController';
import { Favorito } from '../models/Favorite';

const favoritosRoutes = async (fastify: FastifyInstance) => {
  const table = 'favoritos';

  // Get all favorites for a specific user
  fastify.get('/utilizadores/:id/favoritos', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };

    try {
      const favoritos: Favorito[] = await getAll<Favorito>(table);
      // Filter by user ID if necessary
      // Assuming favoritos table has a userId field
      const userFavoritos = favoritos.filter(favorito => favorito.id_utilizador === parseInt(id, 10));
      return userFavoritos;
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to fetch favoritos for user' });
    }
  });

   // Add a favorito for a specific user
  fastify.post('/utilizadores/:id/favoritos/:id2', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id, id2 } = request.params as { id: string; id2: string };

    try {
      await addToTable(table, { id_utilizador: parseInt(id, 10), id_startup: parseInt(id2, 10) });
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to add favorito' });
    }
  });

  // Delete a favorito for a specific user
  fastify.delete('/utilizadores/:id/favoritos/:id2', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id2 } = request.params as { id2: number };

    try {
      await removeFromTable(table, id2);
      return { success: true };
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({ error: 'Failed to delete favorito' });
    }
  });
};


export default favoritosRoutes;
