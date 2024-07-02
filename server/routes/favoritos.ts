import { FastifyInstance } from 'fastify';
import {
  getFavoritosDoUtilizador,
  adicionarFavorito,
  removerFavorito,
  verificarFavorito,
} from '../db/queries';

const favoritosRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/utilizadores/:id/favoritos', async (request) => {
    const { id } = request.params as { id: string };
    const idUtilizador = parseInt(id, 10);
    return getFavoritosDoUtilizador(idUtilizador);
  });

  fastify.post('/utilizadores/:id/favoritos/:id2', async (request) => {
    const { id, id2 } = request.params as { id: string; id2: string };
    const idUtilizador = parseInt(id, 10);
    const idStartup = parseInt(id2, 10);
    await adicionarFavorito(idUtilizador, idStartup);
    return { success: true };
  });

  fastify.delete('/utilizadores/:id/favoritos/:id2', async (request) => {
    const { id, id2 } = request.params as { id: string; id2: string };
    const idUtilizador = parseInt(id, 10);
    const idStartup = parseInt(id2, 10);
    await removerFavorito(idUtilizador, idStartup);
    return { success: true };
  });
};

export default favoritosRoutes;
