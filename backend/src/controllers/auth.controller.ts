import { Request, Response } from 'express';

import createAuthenticationService from '../services/createAuthentication.service';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const { body } = request;

    const { user, ...rest } = await createAuthenticationService(body);

    Object.assign(user, { password: undefined });
    return response.json({ user, ...rest });
  }
}

export default new AuthController();
