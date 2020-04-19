import React, { useState } from 'react';
import api from '../common/api';
import { Text, Button, Flex, Box, Heading } from 'rebass/styled-components';
import { useHistory } from 'react-router-dom';
// import { Input } from '@rebass/forms';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../common/theme';
import Input from '../components/Input';

const StyledLink = styled(Link)`
  color: ${theme.colors.green};
  font-weight: bolder;
  font-size: ${theme.fontSizes[1]};
  text-decoration: none;
`;

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

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordInvalid(true);
      setPasswordErrorMsg('Password must have 8 characters');
    } else {
      setPasswordInvalid(false);
    }
  };

  const checkIfPasswordsMatch = () => {
    setPasswordMatch(password === confirmPassword);
    // if (password !== confirmPassword) {
    //   setPasswordMatch(false);
    // } else {
    //   setPasswordMatch(true);
    // }
  };

  const checkName = () => {
    if (!name || name.length === 0) {
      setNameInvalid(true);
    } else {
      setNameInvalid(false);
    }
  };

  const checkEmail = () => {
    if (!email || email.length === 0) {
      setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    checkEmail();
    checkName();
    validatePassword();

    if (passwordInvalid || nameInvalid || emailInvalid) {
      return;
    } else {
      createNewAccount();
    }
  };

  const createNewAccount = async () => {
    try {
      setButtonLabel('Creating account...');
      await api().post('user', { email, password, name });
      setSuccess(true);
      history.push('/sign-in', { accountCreated: true, authInfo: { email, password } });
    } catch (err) {
      const { response } = err;
      setError(response.data.message);
      setSuccess(false);
    } finally {
      setButtonLabel('Create account');
    }
  };

  return (
    <Flex
      flexDirection="column"
      bg="lightGreen"
      sx={{ borderRadius: 'large' }}
      justifyContent="center"
      alignItems="center"
      width={1}
      height="100vh"
    >
      <Flex
        flexDirection="column"
        bg="white"
        p={40}
        sx={{ borderRadius: 'large' }}
        width={['95%', '85%', '85%', '65%']}
      >
        <Heading fontSize={[3, 4, 5, 5]} marginBottom={20}>
          Create an account
        </Heading>
        <Flex flexDirection="column" justifyContent="space-between" as="form" flex={1}>
          <Input
            type="text"
            placeholder="name@domain.com"
            padding={10}
            label="Email"
            required
            sx={{
              border: '1px solid lightGray',
              borderRadius: '8px',
              outlineColor: 'green',
            }}
            onChange={(event: any) => handleEmailChange(event.target.value)}
          />
          <Input
            type="text"
            label="Name"
            placeholder="Harry Norman"
            required
            onChange={(event: any) => handleNameChange(event.target.value)}
            padding={10}
            sx={{
              border: '1px solid lightGray',
              borderRadius: '8px',
              outlineColor: 'green',
            }}
          />
          <Input
            label="Password"
            type="password"
            placeholder="********"
            required
            onChange={(event: any) => handlePasswordChange(event.target.value)}
            padding={10}
            invalid={passwordInvalid}
            errorMsg="Password must contain 8 characters"
            sx={{
              border: '1px solid lightGray',
              borderRadius: '8px',
              outlineColor: 'green',
            }}
          />

          <StyledLink to="/sign-in">Already have an account? Sign in</StyledLink>

          <Box width={['50%', '25%']} ml="auto" marginTop="40px">
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
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SignUp;
