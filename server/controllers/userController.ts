import { FastifyReply, FastifyRequest } from 'fastify';
import { addToTable, getByUsername } from '../controllers/mainController';
import { User } from '../models/User';

export interface AuthRequest extends FastifyRequest {
  body: {
    username: string;
    password: string;
  };
}

export const register = async (request: AuthRequest, reply: FastifyReply) => {
  const { username, password } = request.body;

  try {
    const hashedPassword = await request.server.bcrypt.hash(password);

    await addToTable("utilizador", { username: username, password: hashedPassword});
    reply.status(201).send({ success: true });
  } catch (error) {
    request.server.log.error(error);
    reply.status(500).send({ error: 'Failed to register user' });
  }
};

export const login = async (request: AuthRequest, reply: FastifyReply) => {
  const { username, password } = request.body;

  try {
    const user = await getByUsername<User>('utilizadores', username);

    if (!user) {
      return reply.status(401).send({ error: 'Invalid username or password' });
    }

    const validPassword = await request.server.bcrypt.compare(password, user.password);
    if (!validPassword) {
      return reply.status(401).send({ error: 'Invalid username or password' });
    }

    const token = request.server.jwt.sign({ id: user.id, username: user.username });

    reply.send({ token });
  } catch (error) {
    request.server.log.error(error);
    reply.status(500).send({ error: 'Failed to login user' });
  }
};

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  reply.send(request.user);
};
