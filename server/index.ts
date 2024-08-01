import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import startupRoutes from './routes/startupRoutes';
import userRoutes from './routes/userRoutes';
import favoritesRoutes from './routes/favoritesRoutes';

const server = fastify({ logger: true });

server.register(jwt, {
  secret: 'supersecret', // Use an environment variable in production
});

server.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['PUT', 'POST', 'GET', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

// Register routes
server.register(startupRoutes);
server.register(userRoutes);
server.register(favoritesRoutes);

// Health check route
server.get('/', async () => {
  return { status: 'Server is up and running!' };
});

// Start the server
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`http://localhost:8080`);
});

export default server;
