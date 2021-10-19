import React, { createContext, FormHTMLAttributes } from 'react';
import {
  useForm,
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  SubmitErrorHandler,
  FieldValues,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormContextValue {
  errors: FieldErrors;
  register: UseFormRegister<RegisterOptions>;
}

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  onInvalidSubmit?: SubmitErrorHandler<FieldValues>;
  onValidSubmit?: (props: FieldValues | any) => any;
  schema?: yup.AnyObjectSchema;
}

export const FormContext = createContext({} as FormContextValue);

const Form: React.FC<FormProps> = ({
  children,
  onValidSubmit,
  onInvalidSubmit,
  schema,
  ...rest
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm(
    schema && {
      resolver: yupResolver(schema),
    }
  );

  return (
    <form
      onSubmit={onValidSubmit && handleSubmit(onValidSubmit, onInvalidSubmit)}
      {...rest}
    >
      <FormContext.Provider value={{ errors, register }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

export default Form;
