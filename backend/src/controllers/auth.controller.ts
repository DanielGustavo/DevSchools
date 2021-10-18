import { Request, Response } from 'express';

import createAuthentication from '../services/createAuthentication.service';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const { body } = request;

    const { user, ...rest } = await createAuthentication(body);

    Object.assign(user, { password: undefined });
    return response.json({ user, ...rest });
  }
}

export default new AuthController();
