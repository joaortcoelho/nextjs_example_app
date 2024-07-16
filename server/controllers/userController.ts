import { FastifyRequest, FastifyReply } from 'fastify';
import main from '../controllers/mainController';
import User from '../models/User';
import bcrypt from 'bcrypt';

export interface AuthRequest extends FastifyRequest {
  body: {
    username: string;
    password: string;
  };
}

// Register: username, password
export const register = async (request: AuthRequest, reply: FastifyReply) => {
  const { username, password } = request.body;

  try {
    const existingUser = await main.getByUsername<User>("utilizador", username);
    if (existingUser) {
      return reply.status(409).send({ error: "Username already taken" });
    }

    // Hash password and add User to table
    const hash = await bcrypt.hash(password, 10);
    main.addToTable("utilizador", { username: username, password: hash });

    reply.status(201).send({ success: true });

  } catch (error) {
    request.server.log.error(error);
    reply.status(500).send({ error: 'Failed to register user' });
  }
};

// Login: username, password
export const login = async (request: AuthRequest, reply: FastifyReply) => {
  const { username, password } = request.body;

  try {
    const user = await main.getByUsername<User>('utilizador', username);
    if (!user) {
      return reply.status(401).send({ error: 'User not found' });
    }

    console.log(bcrypt.hash("test",10));

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
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

// User profile
export const profile = async (request: any, reply: any) => {
  reply.send(request.user);
};
