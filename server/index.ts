import Fastify, { FastifyInstance } from 'fastify';
import startupRoutes from './routes/startups';
import favoritosRoutes from './routes/favoritos';
import pool from './db/db';

const server: FastifyInstance = Fastify({ logger: true });

// Register routes
server.register(startupRoutes);
server.register(favoritosRoutes);

// Health check route
server.get('/', async () => {
  return { status: 'Server is up and running!' };
});

// Start the server
const start = async () => {
  try {
    // Check database connection
    await pool.query('SELECT 1 + 1');

    // If connected successfully, start the server
    await server.listen(3000);
    server.log.info(`Server listening on ${server.server.address()}`);
  } catch (err) {
    server.log.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
