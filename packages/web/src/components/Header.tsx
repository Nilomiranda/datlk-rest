import React from 'react';
import styled from 'styled-components';
import {colors, text} from "../common/designSystem";
import api from '../common/api';
import { useHistory } from 'react-router-dom';

const MainContainer = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  background: ${colors.white};
  box-shadow: 0 1px 0px ${colors.gray};
  
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
  
  h1 {
    color: ${colors.black};
    font-size: ${text.extraLarge};
    margin-left: 38%;
    margin: 0 auto;
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
      <h1>Publications</h1>
    </MainContainer>
  )
}

export default Header;
