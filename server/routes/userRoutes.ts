import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import * as userController from '../controllers/userController';

const userRoutes = async (fastify: FastifyInstance) => {
  // Register
  fastify.post('/register', (request: FastifyRequest, reply: FastifyReply) => {
    return userController.register(request as userController.AuthRequest, reply);
  });
  // Login
  fastify.post('/login', (request: FastifyRequest, reply: FastifyReply) => {
    return userController.login(request as userController.AuthRequest, reply);
  });
  // User Profile
  fastify.get('/profile', { preValidation: [fastify.authenticate] }, (request: FastifyRequest, reply: FastifyReply) => {
    return userController.profile(request, reply);
  });
};

export default userRoutes;
