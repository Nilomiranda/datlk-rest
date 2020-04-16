import React, {useState} from 'react';
import styled from "styled-components";
import Input from "../components/Input";
import {colors, DarkButton, DarkLinkText, ErrorText, text} from "../common/designSystem";
import api from '../common/api';
import { useHistory } from 'react-router-dom';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.lighterGreen};
  height: 100vh;
`

const LoginFormContainer = styled.div`
  background: ${colors.white};
  padding: 40px;
  min-width: 75%;
  max-width: 90%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h1 {
    color: ${colors.black};
    font-size: ${text.extraLarge};
    margin-bottom: 40px;
  }
  
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
  }
  
  .submit-btn {
    align-self: flex-end;
    margin-top: 20px;
  }
`

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useHistory();

  function handleEmailChange(text: string) {
    setEmail(text);
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  async function login(event: any) {
    event.preventDefault();

    if (!email || !password) {
      setSubmitError(true);
      setErrorMsg('Missing credentials');
      return;
    } else {
      setSubmitError(false);
      setErrorMsg('');

      try {
        const res = await api().post('session', { email, password });
        const { data } = res;

        if (data) {
          saveInfoInStorage(data);
          history.push('/home');
        }
      } catch (err) {
        setSubmitError(true);
        setErrorMsg(err.response.data.message);
      }
    }
  }

  function saveInfoInStorage(data: any) {
    const { token, user } = data;
    localStorage.setItem('DTALK_TOKEN', token);
    localStorage.setItem('DTALK_USER', JSON.stringify(user));
  }

  return (
    <MainContainer>
      <LoginFormContainer>
        <h1>Sign in to your account</h1>
        <form>
          <Input type="text" placeholder="name@domain.com" label="Your email" onChange={handleEmailChange}/>
          <Input
            type="password"
            placeholder="********"
            label="Your password"
            onChange={handlePasswordChange}
          />

          <DarkLinkText to="/sign-up">Don't have an account? Create one</DarkLinkText>

          {
            submitError ?
              <ErrorText>{errorMsg}</ErrorText> :
              null
          }

          <DarkButton className="submit-btn" onClick={(event) => login(event)}>Sign in</DarkButton>
        </form>
      </LoginFormContainer>
    </MainContainer>
  )
}

export default SignIn;
