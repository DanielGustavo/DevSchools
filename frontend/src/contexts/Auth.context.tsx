import React, { createContext, useEffect, useState } from 'react';

import * as SchoolService from '../services/School.service';

interface SignInSchoolProps {
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
  schoolId: string;
  userId: string;
  name: string;
  email: string;
  isASchool: boolean;
  avatarFilename: string | null;
}

interface AuthContextValue {
  signInSchool: (credentials: SignInSchoolProps) => Promise<User | undefined>;
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
    const tokenFromLocalStorage =
      window.localStorage.getItem('DevSchools:token');

    return tokenFromLocalStorage ?? undefined;
  });

  const [user, setUser] = useState<User | undefined>(() => {
    const userFromLocalStorage = window.localStorage.getItem('DevSchools:user');

    return userFromLocalStorage ? JSON.parse(userFromLocalStorage) : undefined;
  });

  useEffect(() => {
    if (user && token) {
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

  async function signInSchool(
    credentials: SignInSchoolProps
  ): Promise<User | undefined> {
    const { email, password } = credentials;
    const data = await SchoolService.signIn({ email, password });

    if (!data) return undefined;

    const userData: User = {
      avatarFilename: data.user.avatar_filename,
      email: data.user.email,
      isASchool: data.user.is_a_school,
      name: data.school.name,
      schoolId: data.school.id,
      userId: data.user.id,
    };

    setUser(userData);
    setToken(data.token);

    return userData;
  }

  async function signUpSchool(
    credentials: SignUpProps
  ): Promise<User | undefined> {
    const { email, name, password, passwordConfirmation } = credentials;

    const data = await SchoolService.signUp({
      email,
      name,
      password,
      passwordConfirmation,
    });

    let userData = undefined as User | undefined;

    if (data) {
      userData = await signInSchool({ email, password });
    }

    return userData;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, authenticated, logout, signInSchool, signUpSchool }}
    >
      {children}
    </AuthContext.Provider>
  );
};
