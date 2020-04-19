import React from 'react';
import { Input as RebassInput, Label, InputProps } from '@rebass/forms';
import { Flex, Text } from 'rebass/styled-components';

interface Props extends InputProps {
  label?: string;
  errorMsg?: string;
  invalid?: boolean;
}

const Input = (props: Props) => {
  const { label, id, invalid, errorMsg } = props;

  return (
    <Flex flexDirection="column" alignItems="flex-start" justifyContent="space-between" my={10}>
      <Label htmlFor={id} marginBottom={10}>
        {label}
      </Label>
      <RebassInput
        {...props}
        sx={{
          border: '1px solid lightGray',
          borderRadius: '8px',
          outlineColor: 'green',
        }}
        bg={invalid ? 'lightRed' : 'transparent'}
      />

      {invalid && errorMsg ? (
        <Text color="red" fontSize={12} my={15}>
          {errorMsg}
        </Text>
      ) : null}
    </Flex>
  );
};

export default Input;
