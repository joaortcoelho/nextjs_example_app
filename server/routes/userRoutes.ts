import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import user from "../controllers/userController";

const userRoutes = async (fastify: FastifyInstance) => {
  // Register
  fastify.post("/register", (request: FastifyRequest, reply: FastifyReply) => {
    return user.register(request, reply);
  });
  // Login
  fastify.post("/login", (request: FastifyRequest, reply: FastifyReply) => {
    return user.login(request, reply);
  });
  // User Profile
  fastify.get(
    "/profile",
    (request: FastifyRequest, reply: FastifyReply) => {
      return user.profile(request, reply);
    }
  );
};

export default userRoutes;
