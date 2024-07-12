import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { getAll, getById, add, update, remove } from '../controllers/mainController';
import { Utilizador } from '../models/Utilizador';

const utilizadorRoutes = async (fastify: FastifyInstance) => {
  const table = 'utilizador';
}

export default utilizadorRoutes;
