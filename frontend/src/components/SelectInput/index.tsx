import React, { useContext } from 'react';
import { StylesConfig } from 'react-select';
import { Controller } from 'react-hook-form';

import { FormContext } from '../Form';

import { Container, ErrorMessage, Select } from './styles';

interface SelectInputProps {
  name: string;
  placeholder?: string;
  options: { value: string | number; label: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  options,
  placeholder,
}) => {
  const { errors, control } = useContext(FormContext);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'var(--primary-color)' : '',
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '200px',
    }),
  } as StylesConfig;

  return (
    <Container>
      {errors[name]?.message && (
        <ErrorMessage>{errors[name].message}</ErrorMessage>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ref } }) => (
          <Select
            ref={ref}
            onChange={(inputValue: any) => onChange(inputValue?.value ?? '')}
            options={options}
            styles={customStyles}
            placeholder={placeholder}
          />
        )}
      />
    </Container>
  );
};

export default SelectInput;
