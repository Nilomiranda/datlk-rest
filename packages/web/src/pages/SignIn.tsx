import React, {useState, useEffect, useLayoutEffect} from 'react';
import styled from "styled-components";
import Input from "../components/Input";
import {colors, DarkButton, DarkLinkText, ErrorText, text} from "../common/designSystem";
import api from '../common/api';
import { useHistory } from 'react-router-dom';
import {Box, Button, Flex, Text} from 'rebass/styled-components'

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

type LocationState = {
  sessionExpired?: boolean;
  accountCreated?: boolean;
  auth?: {
    email: string;
    password: string;
  }
}

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Sign in');
  const [accountCreated, setAccountCreated] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const history = useHistory();

  console.log(history.location.state);

  useEffect(() => {

    const { state }: { state: any } = history.location;
    console.log("SignIn -> state", state)

    if (state && state.accountCreated && state.authInfo) {
      setEmail(state.authInfo.email);
      setPassword(state.authInfo.password);
      setAccountCreated(true);
    }

    if (state && state.sessionExpired) {
      setSessionExpired(true);
    }
  }, [history]); 

  const handleEmailChange = (text: string) => {
    setEmail(text);
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  }

  const login = async (event: any) => {
    event.preventDefault();

    if (!email || !password) {
      setSubmitError(true);
      setErrorMsg('Missing credentials');
      return;
    } else {
      setSubmitError(false);
      setErrorMsg('');

      try {
        setButtonLabel('Signing in...');
        const res = await api().post('session', { email, password });
        const { data } = res;

        if (data) {
          saveInfoInStorage(data);
          history.push('/home');
        }
      } catch (err) {
        setSubmitError(true);
        setErrorMsg(err.response.data.message);
      } finally {
        setButtonLabel('Sign in');
      }
    }
  }

  const saveInfoInStorage = (data: any) => {
    const { token, user } = data;
    localStorage.setItem('DTALK_TOKEN', token);
    localStorage.setItem('DTALK_USER', JSON.stringify(user));
  }

  return (
    <MainContainer>
      <Flex flexDirection="column" alignItems="flex-start" bg="white" p={40} width={['95%', '85%', '80%', '60%']} sx={{ borderRadius: 'large' }}>
        <Box width={1}>
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

            <Box width={1/4} ml="auto">
              <Button variant="primary" onClick={(event) => login(event)} width={1}>{buttonLabel}</Button>
            </Box>

            {
              sessionExpired ?
              <Text color="red" fontSize={14}>Your session expired. Please sign in again.</Text> :
              null
            }

            {
              accountCreated ?
              <Text color="green" fontWeight="bolder" fontSize={14}>Account created! Now you can sign in.</Text> :
              null
            }

          </form>
        </Box>
      </Flex>
    </MainContainer>
  )
}

export default SignIn;
