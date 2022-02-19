import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';

import { ReactComponent as BuildingImage } from '../../assets/images/amico.svg';

import useAuth from '../../hooks/useAuth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Form, ButtonsWrapper, InputsWrapper } from './styles';

interface FormValues {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
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

const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { signUpSchool: signUp } = useAuth();

  const { push } = useHistory();

  async function onValidSubmit(formValues: FormValues) {
    setLoading(true);
    const user = await signUp(formValues);

    if (user) {
      setLoading(false);
      push('/dashboard');
    }
  }

  return (
    <Container>
      <BuildingImage />

      <Form onValidSubmit={onValidSubmit} schema={formSchema}>
        <h1>Subscribe your school here!</h1>

        <InputsWrapper>
          <Input name="email" type="email" placeholder="Email" />

          <Input
            name="name"
            type="text"
            autoComplete="username"
            placeholder="Name of your school"
          />

          <Input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
          />

          <Input
            name="passwordConfirmation"
            type="password"
            autoComplete="new-password"
            placeholder="Password confirmation"
          />
        </InputsWrapper>

        <ButtonsWrapper>
          <Button type="submit" disabled={loading}>
            Sign Up
          </Button>
          <Button
            secondary
            outlined
            type="button"
            onClick={() => push('/signin')}
          >
            Sign In
          </Button>
        </ButtonsWrapper>
      </Form>
    </Container>
  );
};

export default SignupPage;
