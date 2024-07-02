// src/app.ts
import fastify, { FastifyInstance } from 'fastify';
import { getAllStartups, getStartupById } from './controllers/startupController';

const server: FastifyInstance = fastify();

server.get('/startups', getAllStartups);
server.get('/startups/:id', getStartupById);

export default server;
