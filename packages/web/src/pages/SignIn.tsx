import React, { useState, useEffect } from 'react';
import api from '../common/api';
import { useHistory, Link } from 'react-router-dom';
import { Box, Button, Flex, Text, Heading } from 'rebass/styled-components';
import styled from 'styled-components';
import theme from '../common/theme';
import Input from '../components/Input';

const StyledLink = styled(Link)`
  color: ${theme.colors.green};
  font-weight: bolder;
  font-size: ${theme.fontSizes[1]};
  text-decoration: none;
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Sign in');
  const [accountCreated, setAccountCreated] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const { state }: { state: any } = history.location;

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
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

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
  };

  const saveInfoInStorage = (data: any) => {
    const { token, user } = data;
    localStorage.setItem('DTALK_TOKEN', token);
    localStorage.setItem('DTALK_USER', JSON.stringify(user));
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="flex-start"
      width={['95%', '85%', '80%', '60%']}
      sx={{ borderRadius: 'large' }}
      margin="0 auto"
      height="100vh"
    >
      <Flex
        width={1}
        flexDirection="column"
        justifyContent="space-between"
        margin="auto 0"
        bg="white"
        padding={40}
        sx={{ borderRadius: 'large' }}
      >
        <Heading fontSize={[3, 4, 5, 5]}>Sign in to your account</Heading>
        <Flex as="form" flex={1} flexDirection="column" justifyContent="space-around">
          <Input
            type="text"
            placeholder="name@domain.com"
            padding={10}
            onChange={(event) => handleEmailChange(event.target.value)}
          />
          <Input
            type="password"
            placeholder="********"
            padding={10}
            onChange={(event) => handlePasswordChange(event.target.value)}
          />

          <StyledLink to="/sign-up">Don't have an account? Create one</StyledLink>

          {submitError ? (
            <Text color="red" fontSize={14}>
              {errorMsg}
            </Text>
          ) : null}

          <Box width={['50%', '25%']} ml="auto" marginTop="40px">
            <Button variant="primary" onClick={(event) => login(event)} width={1}>
              {buttonLabel}
            </Button>
          </Box>

          {sessionExpired ? (
            <Text color="red" fontSize={14}>
              Your session expired. Please sign in again.
            </Text>
          ) : null}

          {accountCreated ? (
            <Text color="green" fontWeight="bolder" fontSize={14}>
              Account created! Now you can sign in.
            </Text>
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignIn;
