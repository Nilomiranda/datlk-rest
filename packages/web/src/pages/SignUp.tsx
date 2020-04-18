import React, {useState} from 'react';
import styled from "styled-components";
import Input from "../components/Input";
import {colors, DarkButton, DarkLinkText, text} from "../common/designSystem";
import api from '../common/api';
import {Text, Button, Flex, Box} from 'rebass/styled-components';
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

function SignUp() {
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
    <MainContainer>
      <Flex flexDirection="column" bg="white" p={40} width={['95%', '85%', '85%', '65%']} sx={{ borderRadius: 'large' }}>
        <h1>Create an account</h1>
        <form>
          <Input
            type="text"
            placeholder="name@domain.com"
            label="Your email*"
            onChange={handleEmailChange}
            errorMsg="Email is required"
            invalid={emailInvalid}
          />
          <Input
            type="text"
            placeholder="Harry Norman"
            label="Your name*"
            onChange={handleNameChange}
            errorMsg="Name is required"
            invalid={nameInvalid}
          />
          <Input
            type="password"
            placeholder="********"
            label="Your password"
            invalid={passwordInvalid}
            errorMsg={passwordErrorMsg}
            onChange={handlePasswordChange}
          />
          <Input
            type="password"
            placeholder="********"
            label="Confirm password"
            onChange={handleConfirmPasswordChange}
            errorMsg="Passwords must match"
            invalid={!passwordMatch}
          />

          <DarkLinkText to="/sign-in">Already have an account? Sign in</DarkLinkText>

            <Box width={1/4} ml="auto">
              <Button variant="primary" onClick={(event) => handleSubmit(event)} width={1}>{buttonLabel}</Button>
            </Box>

          {
            error && !success ?
              <Text fontSize={[ 1, 1, 1 ]} fontWeight='medium' color='red' mt={10} textAlign="center">{error}</Text> :
              null
          }

          {
            success ?
              <Text fontSize={[ 1, 1, 1 ]} fontWeight='medium' color='green' mt={10} textAlign="center">
                Account successfully created!
              </Text> :
              null
          }

        </form>
      </Flex>
    </MainContainer>
  )
}

export default SignUp;
