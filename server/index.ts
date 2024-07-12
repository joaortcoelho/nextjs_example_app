import Fastify, { FastifyInstance } from 'fastify';
import startupRoutes from './routes/startupRoutes';
import utilizadorRoutes from './routes/utilizadorRoutes';
import favoritosRoutes from './routes/favoritosRoutes';
import pool from './db/db';

const server: FastifyInstance = Fastify({ 
  logger: true,
  connectionTimeout: 60000,
  keepAliveTimeout: 60000,
});

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
    server.log.info('Database connected successfully');

    // If connected successfully, start the server
    await server.listen({port: 8080});
    server.log.info(`Server listening on port 8080`);
  } catch (err) {
    server.log.error('Error starting server:', err);
    process.exit(1);
  }
};

start();
