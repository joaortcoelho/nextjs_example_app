import Fastify from 'fastify';
import jwt from '@fastify/jwt';
import dbConfig from './config/dbConfig';
import startupRoutes from './routes/startupRoutes';
import userRoutes from './routes/userRoutes';

const server = Fastify({ logger: true });

server.register(jwt, {
  secret: 'supersecret' // Use an environment variable in production
});

// Decorate the Fastify instance
server.decorate('authenticate', async (request: { jwtVerify: () => any; }, reply: { send: (arg0: unknown) => void; }) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Register routes
server.register(startupRoutes);
server.register(userRoutes);

// Health check route
server.get('/', async () => {
  return { status: 'Server is up and running!' };
});

// Start the server
const start = async () => {
  try {
    await server.listen({ port: dbConfig.port });
    server.log.info(`Server listening on ${server.server.address()}`);
  } catch (err) {
    server.log.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
