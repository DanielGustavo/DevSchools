import React, { InputHTMLAttributes, useContext } from 'react';

import { FormContext } from '../Form';

import { Container, ErrorMessage } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const { errors, register } = useContext(FormContext);

  return (
    <Container>
      {errors[name]?.message && (
        <ErrorMessage>{errors[name].message}</ErrorMessage>
      )}
      <input {...register(name)} {...rest} />
    </Container>
  );
};

export default Input;
