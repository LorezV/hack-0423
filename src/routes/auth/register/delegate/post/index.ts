import { FastifyInstance, FastifyRequest } from 'fastify';
import schema from './schema';
import { IBody, TResponse } from './interfaces';
import { getError } from '@utils';
import { string } from 'yup';
import bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';

export default (instance: FastifyInstance, options: unknown, done: () => void) => {
  async function post(request: FastifyRequest<{ Body: IBody }>): Promise<TResponse> {
    const data = request.body;
    const { userService, tokenService } = instance.dependencies.services;

    try {
      string().email().required().validateSync(data.email);
    } catch (error: unknown) {
      throw getError(400, 'INVALID_EMAIL');
    }

    if (data.password !== data.passwordRepeat) {
      throw getError(400, 'PASSWORD_NOT_MATCH');
    }

    const candidate = await userService.findByEmail(data.email);
    if (candidate) {
      throw getError(409, 'USER_EXISTS');
    }

    const user = await userService.createUser({
      email: data.email,
      password: await bcrypt.hash(data.password, 4),
      firstname: data.firstname,
      lastname: data.lastname,
      type: UserType.DELEGATE,
    });

    return await tokenService.createToken({ userID: user.id, userType: user.type }, null);
  }

  instance.post('/', { schema }, post);
  done();
};
