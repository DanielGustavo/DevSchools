import React, { useContext, useState } from 'react';
import { StylesConfig } from 'react-select';
import { Controller } from 'react-hook-form';

import { FormContext } from '../Form';

import { Container, ErrorMessage, Select } from './styles';

export interface Option {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  name: string;
  placeholder?: string;
  options?: Option[];
  loadOptions?: (page: number) => Promise<Option[]>;
}

const SelectInput: React.FC<SelectInputProps> = ({
  name,
  options: optionsProp,
  placeholder,
  loadOptions: loadOptionsProp,
}) => {
  const [options, setOptions] = useState(optionsProp || []);
  const [optionsPage, setOptionsPage] = useState(optionsProp ? 2 : 1);
  const [reachedLastPage, setReachedLastPage] = useState(false);

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

  async function loadOptions() {
    if (!loadOptionsProp || reachedLastPage) return;

    const loadedOptions = await loadOptionsProp(optionsPage);

    if (loadedOptions.length === 0) {
      setReachedLastPage(true);
    }

    setOptionsPage(optionsPage + 1);
    setOptions([...options, ...loadedOptions]);
  }

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
            onMenuScrollToBottom={loadOptions}
          />
        )}
      />
    </Container>
  );
};

export default SelectInput;
