import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';

import { ReactComponent as WelcomeImage } from '../../assets/images/welcome.svg';

import useAuth from '../../hooks/useAuth';

import Input from '../../components/Input';

import { Container, Button, Form, InputsWrapper } from './styles';

interface FormValues {
  email: string;
  password: string;
}

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(10).max(120).required(),
});

const SigninPage: React.FC = () => {
  const { signIn } = useAuth();
  const { push } = useHistory();

  async function onValidSubmit(formValues: FormValues) {
    const user = await signIn(formValues);

    if (user) {
      push('/dashboard');
    }
  }

  return (
    <Container>
      <Form onValidSubmit={onValidSubmit} schema={formSchema}>
        <h1>
          Hey! <span>Come in!</span>
        </h1>

        <InputsWrapper>
          <Input name="email" type="email" placeholder="Email" />

          <Input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="Password"
          />
        </InputsWrapper>

        <Button type="submit">Sign In</Button>
        <small>
          You don’t have an account? <Link to="/signup">Join us</Link>!
        </small>
      </Form>

      <WelcomeImage />
    </Container>
  );
};

export default SigninPage;
