import React from 'react';
import styled from 'styled-components';
import {colors, text} from "../common/designSystem";

const InputWrapper = styled.div<{ invalid?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin: 20px 0;
  
  span {
    margin-bottom: 7px;
    font-size: ${text.extraSmall};
    
    &.error-msg {
      color: ${colors.red};
      font-size: ${text.extraSmall};
      margin-top: 15px;
    }
  }
  
  input {
    padding: 10px 20px;
    padding-left: 7px;
    border-radius: 4pt;
    border: 1px solid ${colors.lighterGray};
    width: 100%;
    font-size: ${text.extraSmall};
    background: ${props => (props.invalid ? colors.lighterRed : 'unset')};
    color: ${props => (props.invalid ? colors.lightRed : 'unset')};
  }
`

export interface InputProps {
  type: string;
  placeholder: string;
  label: string;
  disabled?: boolean;
  errorMsg?: string;
  invalid?: boolean;
  onChange?: (text: string) => void;
}

function Input(props: InputProps) {
  const { type, label, placeholder, disabled, errorMsg, invalid, onChange } = props;

  function handleValueChange(event: any) {
    const { target: { value } } = event;
    if (onChange) {
      onChange(value);
    }
  }

  return (
    <InputWrapper invalid={invalid}>
      <span>{label}</span>
      <input placeholder={placeholder} type={type} disabled={disabled} onChange={event => handleValueChange(event)} />
      {
        invalid ?
          <span className="error-msg">{errorMsg}</span> :
          null
      }
    </InputWrapper>
  )
}

export default Input;
