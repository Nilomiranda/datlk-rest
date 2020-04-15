import styled from 'styled-components';
import { Link } from "react-router-dom";

export const colors = {
  green: '#57a99a',
  waterGreen: '#76dbd1',
  lightGreen: '#d1eecc',
  lighterGreen: '#ecf4f3',

  black: '#000000',
  gray: '#63707e',
  lightGray: '#93b5b3',
  lighterGray: '#f2f6f5',
  white: '#ffffff',

  darkRed: '#851d41',
  red: '#db3056',
  lightRed: '#ff6464',
  lighterRed: '#fde2e2',
}

export const text = {
  extraSmall: '10pt',
  small: '12pt',
  medium: '15pt',
  large: '18pt',
  extraLarge: '22pt',
}

// components
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  background: ${colors.lighterGreen};
  height: 100%;
`

export const DarkButton = styled.button<{ disabled?: boolean }>`
  background: ${colors.green};
  color: ${colors.white};
  font-weight: bolder;
  font-size: ${text.extraSmall};
  border-radius: 4pt;
  padding: 10px 20px;
  border: none;
  opacity: ${({ disabled }) => disabled ? '0.3' : '1'};
`

export const DarkLinkText = styled(Link)`
  color: ${colors.green};
  font-weight: bolder;
  font-size: ${text.extraSmall};
`

export const ErrorText = styled.span`
  color: ${colors.red};
  font-size: ${text.extraSmall};
  margin: 20px 0;
`
