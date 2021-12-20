import React, { createContext, useEffect, useState } from 'react';

import api from '../helpers/api';

import * as SchoolService from '../services/School.service';
import * as AuthService from '../services/Auth.service';
import { validateToken } from '../utils/validateToken';

interface SignInProps {
  email: string;
  password: string;
}

interface SignUpProps {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

interface User {
  userId: string;
  email: string;
  isASchool: boolean;
  avatarFilename: string | null;
  personId?: string;
  name: string;
  role?: string;
  schoolId: string;
  settedUp?: boolean;
}

interface AuthContextValue {
  signIn: (credentials: SignInProps) => Promise<User | undefined>;
  signUpSchool: (credentials: SignUpProps) => Promise<User | undefined>;
  logout: () => void;
  token?: string;
  user?: User;
  authenticated: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const [token, setToken] = useState<string | undefined>(() => {
    const StoredToken = window.localStorage.getItem('DevSchools:token');

    const tokenIsInvalid = !StoredToken || !validateToken(StoredToken);

    if (tokenIsInvalid) {
      return undefined;
    }

    if (StoredToken && api) {
      api.defaults.headers.common.Authorization = `Bearer ${StoredToken}`;
    }

    return StoredToken ?? undefined;
  });

  const [user, setUser] = useState<User | undefined>(() => {
    const userFromLocalStorage = window.localStorage.getItem('DevSchools:user');

    return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : undefined;
  });

  useEffect(() => {
    if (user && token && validateToken(token)) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [user, token]);

  function logout() {
    window.localStorage.setItem('DevSchools:token', '');
    window.localStorage.setItem('DevSchools:user', '');

    setUser(undefined);
    setToken(undefined);
  }

  async function signIn(credentials: SignInProps): Promise<User | undefined> {
    const { email, password } = credentials;
    const data = await AuthService.signIn({ email, password });

    if (!data) return undefined;

    const userData = {
      userId: data.user.id,
      email: data.user.email,
      isASchool: data.user.is_a_school,
      avatarFilename: data.user.avatar_filename,
    } as User;

    if (data.school) {
      Object.assign(userData, {
        schoolId: data.school.id,
        name: data.school.name,
      });
    } else if (data.person) {
      Object.assign(userData, {
        personId: data.person.id,
        name: data.person.name,
        role: data.person.role,
        schoolId: data.person.school_id,
        settedUp: data.person.setted_up,
      });
    }

    setUser(userData);
    setToken(data.token);

    return userData;
  }

  async function signUpSchool(
    credentials: SignUpProps
  ): Promise<User | undefined> {
    const { email, name, password, passwordConfirmation } = credentials;

    const data = await SchoolService.create({
      email,
      name,
      password,
      passwordConfirmation,
    });

    let userData = undefined as User | undefined;

    if (data) {
      userData = await signIn({ email, password });
    }

    return userData;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, authenticated, logout, signIn, signUpSchool }}
    >
      {children}
    </AuthContext.Provider>
  );
};
