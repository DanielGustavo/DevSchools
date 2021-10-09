import { Request, Response } from 'express';

import createPersonAuthenticationService from '../services/createPersonAuthentication.service';
import createSchoolAuthenticationService from '../services/createSchoolAuthentication.service';

class AuthController {
  async authenticateSchool(request: Request, response: Response) {
    const { body } = request;

    const { user, token, school } = await createSchoolAuthenticationService(
      body
    );

    Object.assign(user, { password: undefined });
    return response.json({ user, token, school });
  }

  async authenticatePerson(request: Request, response: Response) {
    const { body } = request;

    const { user, token, person } = await createPersonAuthenticationService(
      body
    );

    Object.assign(user, { password: undefined });
    return response.json({ user, token, person });
  }
}

export default new AuthController();
