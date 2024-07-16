import fastify from 'fastify';
import jwt from '@fastify/jwt';
import dbConfig from './config/dbConfig';
import startupRoutes from './routes/startupRoutes';
import userRoutes from './routes/userRoutes';

const server = fastify({ logger: true });

server.register(jwt, {
  secret: 'supersecret' // Use an environment variable in production
});

// Decorate the Fastify instance
server.decorate('authenticate', async (request, reply) => {
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
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`http://localhost:8080`)
})

export default server;
