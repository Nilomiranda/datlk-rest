import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../common/api';
import { Text, Button, Flex, Box } from 'rebass/styled-components';
import { useHistory } from 'react-router-dom';
import { Input } from '@rebass/forms';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [nameInvalid, setNameInvalid] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Create account');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  function validatePassword() {
    if (password.length < 8) {
      setPasswordInvalid(true);
      setPasswordErrorMsg('Password must have 8 characters');
    } else {
      setPasswordInvalid(false);
    }
  }

  function checkIfPasswordsMatch() {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }

  function checkName() {
    if (!name || name.length === 0) {
      setNameInvalid(true);
    } else {
      setNameInvalid(false);
    }
  }

  function checkEmail() {
    if (!email || email.length === 0) {
      setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }
  }

  function handlePasswordChange(text: string) {
    setPassword(text);
  }

  function handleConfirmPasswordChange(text: string) {
    setConfirmPassword(text);
  }

  function handleEmailChange(text: string) {
    setEmail(text);
  }

  function handleNameChange(text: string) {
    setName(text);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    validatePassword();
    checkIfPasswordsMatch();
    checkEmail();
    checkName();

    if (passwordInvalid || nameInvalid || emailInvalid || !passwordMatch) {
      return;
    } else {
      createNewAccount();
    }
  }

  async function createNewAccount() {
    try {
      setButtonLabel('Creating account...');
      await api().post('user', { email, password, name });
      setSuccess(true);
      history.push('/sign-in', { accountCreated: true, authInfo: { email, password } });
    } catch (err) {
      const { response } = err;
      console.error('Error when creating account -> ', response);
      setError(response.data.message);
      setSuccess(false);
    } finally {
      setButtonLabel('Create account');
    }
  }

  return (
    <Flex flexDirection="column" bg="white" p={40} width={['95%', '85%', '85%', '65%']} sx={{ borderRadius: 'large' }}>
      <h1>Create an account</h1>
      <form>
        <Input type="text" placeholder="name@domain.com" onChange={(event) => handleEmailChange(event.target.value)} />
        <Input type="text" placeholder="Harry Norman" onChange={(event) => handleNameChange(event.target.value)} />
        <Input type="password" placeholder="********" onChange={(event) => handlePasswordChange(event.target.value)} />
        <Input
          type="password"
          placeholder="********"
          onChange={(event) => handleConfirmPasswordChange(event.target.value)}
        />

        <Link to="/sign-in">Already have an account? Sign in</Link>

        <Box width={1 / 4} ml="auto">
          <Button variant="primary" onClick={(event) => handleSubmit(event)} width={1}>
            {buttonLabel}
          </Button>
        </Box>

        {error && !success ? (
          <Text fontSize={[1, 1, 1]} fontWeight="medium" color="red" mt={10} textAlign="center">
            {error}
          </Text>
        ) : null}

        {success ? (
          <Text fontSize={[1, 1, 1]} fontWeight="medium" color="green" mt={10} textAlign="center">
            Account successfully created!
          </Text>
        ) : null}
      </form>
    </Flex>
  );
};

export default SignUp;
