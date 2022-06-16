import React from 'react';
import { FormHelperText, FormLabel, Input } from '@chakra-ui/react';

/* eslint no-unused-vars: "off" */
type FormsInputLabelProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  name: string;
};

export const FormsInputLabel = (props: FormsInputLabelProps) => {
  const {
    label, value, onChange, type, placeholder, error, onBlur, name,
  } = props;

  return (
    <>
      <FormLabel>{label}</FormLabel>
      <Input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        onBlurCapture={onBlur}
        name={name}
      />
      {error !== '' && <FormHelperText color="red">{error}</FormHelperText>}
    </>
  );
};

FormsInputLabel.defaultProps = {
  type: 'text',
  placeholder: '',
  error: '',
  onBlur: () => {},
};
