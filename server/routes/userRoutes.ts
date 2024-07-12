import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as userController from '../controllers/userController';

const userRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/register', (request: FastifyRequest, reply: FastifyReply) => {
    return userController.register(request as userController.AuthRequest, reply);
  });

  fastify.post('/login', (request: FastifyRequest, reply: FastifyReply) => {
    return userController.login(request as userController.AuthRequest, reply);
  });

  fastify.get('/profile', { preValidation: [fastify.authenticate] }, (request: FastifyRequest, reply: FastifyReply) => {
    return userController.profile(request, reply);
  });
};

export default userRoutes;
