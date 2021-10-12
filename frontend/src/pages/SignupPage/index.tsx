import React from 'react';

import { ReactComponent as BuildingImage } from '../../assets/images/amico.svg';

import { Container, Input, Button, OutlinedButton, Form } from './styles';

const SignupPage: React.FC = () => (
  <Container>
    <BuildingImage />

    <Form>
      <h1>Subscribe your school here!</h1>

      <Input type="email" name="email" placeholder="Email" />
      <Input type="text" name="name" placeholder="Name of your school" />
      <Input type="password" name="password" placeholder="Password" />
      <Input
        type="password"
        name="passwordConfirmation"
        placeholder="Password confirmation"
      />

      <div>
        <Button type="submit">Sign Up</Button>
        <OutlinedButton type="submit">Sign In</OutlinedButton>
      </div>
    </Form>
  </Container>
);

export default SignupPage;
