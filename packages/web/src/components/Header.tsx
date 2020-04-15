import React from 'react';
import styled from 'styled-components';
import {colors, text} from "../common/designSystem";
import api from '../common/api';
import { useHistory } from 'react-router-dom';

const MainContainer = styled.nav`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 20px 40px;
  
  button {
    font-size: ${text.medium};
    color: ${colors.green};
    font-weight: bolder;
    background: transparent;
    border: none;
    
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`

function Header() {
  const history = useHistory();

  async function signOut() {
    try {
      await api(true).delete('session');
      deleteTokenFromStorage();
      history.push('/sign-in');
    } catch (err) {
      console.error('DEBUG:: Error when signin out -> ', err);
    }
  }

  function deleteTokenFromStorage() {
    localStorage.removeItem('DTALK_TOKEN');
  }

  return (
    <MainContainer>
      <button onClick={() => signOut()}>Sign out</button>
    </MainContainer>
  )
}

export default Header;
