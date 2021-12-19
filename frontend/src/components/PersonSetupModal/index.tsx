import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';

import FormModal from '../FormModal';
import Input from '../Input';

import useAuth from '../../hooks/useAuth';

import { setupPerson } from '../../services/Person.service';

import { validateToken } from '../../utils/validateToken';

interface Person {
  id: string;
  name: string;
  role: string;
  schoolId: string;
  settedUp: string;
}

interface TokenPayloadData {
  avatar: string | null;
  exp: number;
  iat: number;
  isASchool: boolean;
  person: Person;
  subject: string;
}

interface FormValues {
  name: string;
  password: string;
  passwordConfirmation: string;
}

const schema = yup.object().shape({
  name: yup.string().min(5).max(100).required(),
  password: yup.string().min(10).max(120).required(),
  passwordConfirmation: yup
    .string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password')],
      'password confirmation must be equal to the password'
    ),
});

const PersonSetupModal: React.FC = () => {
  const [person, setPerson] = useState<Person>();
  const [token, setToken] = useState('');
  const [open, setOpen] = useState(false);

  const { search } = useLocation();
  const { authenticated } = useAuth();

  useEffect(() => {
    const based64Token = new URLSearchParams(search).get('token');

    if (!based64Token) return;

    const decodedBased64token = atob(based64Token);

    if (validateToken(decodedBased64token) && !authenticated) {
      const payload = atob(decodedBased64token.split('.')[1]);
      const data = JSON.parse(payload) as TokenPayloadData;

      setOpen(true);
      setPerson(data.person);
      setToken(decodedBased64token);
    } else {
      setOpen(false);
      setPerson(undefined);
      setToken('');
    }
  }, [search, setToken, setPerson, setOpen, authenticated]);

  function handleSubmit({ name, password, passwordConfirmation }: FormValues) {
    setupPerson({ name, password, passwordConfirmation, token });
  }

  return (
    <FormModal
      schema={schema}
      open={open}
      handleClose={() => setOpen(false)}
      onConfirm={handleSubmit}
    >
      <h2>Hi {person?.name}! Setup your account first</h2>

      <Input
        autoFocus
        name="name"
        placeholder="name"
        defaultValue={person?.name}
      />
      <Input
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="password"
      />
      <Input
        name="passwordConfirmation"
        type="password"
        autoComplete="new-password"
        placeholder="password confirmation"
      />
    </FormModal>
  );
};

export default PersonSetupModal;
