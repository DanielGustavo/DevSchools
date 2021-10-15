import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ReactComponent as BuildingImage } from '../../assets/images/amico.svg';

import {
  Container,
  Input,
  Button,
  OutlinedButton,
  Form,
  ErrorMessage,
} from './styles';

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { push } = useHistory();

  function onValidSubmit() {
    console.log('submited');
  }

  return (
    <Container>
      <BuildingImage />

      <Form onSubmit={handleSubmit(onValidSubmit)}>
        <h1>Subscribe your school here!</h1>

        <ErrorMessage> {errors?.email?.message}</ErrorMessage>
        <Input {...register('email')} type="email" placeholder="Email" />

        <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        <Input
          {...register('name')}
          type="text"
          autoComplete="username"
          placeholder="Name of your school"
        />

        <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        <Input
          {...register('password')}
          type="password"
          autoComplete="new-password"
          placeholder="Password"
        />

        <ErrorMessage>{errors?.passwordConfirmation?.message}</ErrorMessage>
        <Input
          {...register('passwordConfirmation')}
          type="password"
          autoComplete="new-password"
          placeholder="Password confirmation"
        />

        <div>
          <Button type="submit">Sign Up</Button>
          <OutlinedButton type="button" onClick={() => push('/signin')}>
            Sign In
          </OutlinedButton>
        </div>
      </Form>
    </Container>
  );
};

export default SignupPage;
