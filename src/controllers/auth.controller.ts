import { Request, Response } from 'express';

import createAuthenticationService from '../services/createAuthentication.service';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const { body } = request;

    const { user, token } = await createAuthenticationService(body);

    Object.assign(user, { password: undefined });
    return response.json({ user, token });
  }
}

export default new AuthController();
