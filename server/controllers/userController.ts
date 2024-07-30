import { FastifyRequest, FastifyReply } from 'fastify';
import main from '../controllers/mainController';
import User from '../models/User';
import bcrypt from 'bcrypt';

const addAdminUser = async () => {
  const username = 'admin';
  const password = await bcrypt.hash('admin', 10);

  // Verifique se o usuário admin já existe
  const user = await main.getByParam('utilizador', 'username', username);
  if (!user) {
    await main.addToTable('utilizador', { username, password });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }
};

// Register: username, password
const register = async (request: any, reply: FastifyReply) => {
  const { username, password } = request.headers;

  try {
    const existingUser = await main.getByParam<User>('utilizador', 'username', username);
    if (existingUser) {
      return reply.status(409).send({ error: 'Username already taken' });
    }

    // Hash password and add User to table
    const hash = await bcrypt.hash(password, 10);
    await main.addToTable('utilizador', { username: username, password: hash });

    reply.status(201).send({ success: true });
  } catch (error) {
    request.server.log.error(error);
    reply.status(500).send({ error: 'Failed to register user' });
  }
};

// Login: username, password
const login = async (request: any, reply: FastifyReply) => {
  const { username, password } = request.headers;

  try {
    const user = await main.getByParam<User>('utilizador', 'username', username);
    if (!user) {
      return reply.status(401).send({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return reply.status(401).send({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = request.server.jwt.sign({
      id: user.id,
      username: user.username,
      role: user.role,
    });
    reply.send({ token });
  } catch (error) {
    request.server.log.error(error);
    reply.status(500).send({ error: 'Failed to login user' });
  }
};

// User profile
const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const decoded: any = request.server.jwt.verify((request.headers as any).token);
    return await main.getByParam('utilizador', 'id', decoded.id);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ message: 'Erro ao carregar perfil do utilizador' });
  }
};

// Auth Handling //

const authenticationHandler = (condition: (decoded: any, request: FastifyRequest) => boolean, errMsg: string) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.headers.authorization;
    if (!token) {
      reply.status(401).send({ message: 'Token em falta' });
      return;
    }

    try {
      const decoded: any = request.server.jwt.verify(token);
      if (!decoded || !decoded.id) {
        reply.status(403).send({ message: 'Token inválido' });
        return;
      }
      if (condition(decoded, request)) {
        return;
      } else {
        return reply.status(403).send({ message: errMsg });
      }
    } catch (error) {
      console.error(error);
      return reply.status(401).send({ message: 'Token inválido' });
    }
  };
};

const authenticateTokenVerifier = authenticationHandler((decoded: any) => true, 'Token inválido');

const isUserAdmin = authenticationHandler((decoded: any) => decoded.role === 'admin', 'Utilizador não é Admin');

const isUserAuthorizedToTakeAction = authenticationHandler(
  (decoded: any, request: any) => decoded.id == (request.params as any).id,
  'Utilizador sem permissões'
);

const functions = {
  addAdminUser,
  authenticateTokenVerifier,
  authenticationHandler,
  isUserAdmin,
  isUserAuthorizedToTakeAction,
  login,
  register,
  profile,
};

export default functions;
