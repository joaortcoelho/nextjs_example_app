// src/controllers/startupController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { getAllFromTable, getAllFromTableByParameter } from "../services/startupService";

export const getAllStartups = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
        const startups = await getAllFromTable("startup");
        reply.send(startups);
    } catch (err) {
        console.error(`Error in getAllStartups controller:`, err);
        reply.status(500).send({ error: 'Error fetching startups' });
    }
};

export const getStartupById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<void> => {
    try {
        const id = request.params.id;
        const startup = await getAllFromTableByParameter("startup", "id", id);
        if (startup.length === 0) {
            reply.status(404).send({ error: 'Startup not found' });
            return;
        }
        reply.send(startup[0]);
    } catch (err) {
        console.error(`Error in getStartupById controller for id '${request.params.id}':`, err);
        reply.status(500).send({ error: 'Error fetching startup' });
    }
};
