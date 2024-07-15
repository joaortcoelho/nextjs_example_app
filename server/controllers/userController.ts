import { FastifyReply, FastifyRequest } from 'fastify';
import main from '../controllers/mainController';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export interface AuthRequest extends FastifyRequest {
  body: {
    username: string;
    password: string;
  };
}

const saltRounds = 10;

export const register = async (request: AuthRequest, reply: FastifyReply) => {
  const { username, password } = request.body;

  try {
    // hash password and if ok add to table
    const hashedPassword = await bcrypt.hash(password, saltRounds, function(err, hash){
      main.addToTable("utilizador", { username: username, password: hashedPassword});
    });
    reply.status(201).send({ success: true });

  } catch (error) {
    request.server.log.error(error);
    reply.status(500).send({ error: 'Failed to register user' });
  }
};

export const login = async (request: AuthRequest, reply: FastifyReply) => {
  const { username, password } = request.body;

  try {
    const user = await main.getByUsername<User>('utilizador', username);
    if (!user) {
      return reply.status(401).send({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password
    let passwordHash = await bcrypt.hash(user.password, saltRounds);
    const isPasswordValid = await bcrypt.compare(user.password, passwordHash);
    if (!isPasswordValid) {
      return reply.status(401).send({ error: 'Invalid password' });
    }

    // Generate a JWT token
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
