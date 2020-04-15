import React, {useState} from 'react';
import styled from "styled-components";
import Input from "../components/Input";
import {colors, DarkButton, DarkLinkText, text} from "../common/designSystem";
import api from '../common/api';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.lighterGreen};
  height: 100%;
`

const LoginFormContainer = styled.div`
  background: ${colors.white};
  padding: 40px;
  width: 50%;
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
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [nameInvalid, setNameInvalid] = useState(false);

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

    // debugger;
    if (passwordInvalid || nameInvalid || emailInvalid || !passwordMatch) {
      return;
    } else {
      createNewAccount();
    }
  }

  async function createNewAccount() {
    await api.post('user', { email, password, name });
  }

  return (
    <MainContainer>
      <LoginFormContainer>
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

          <DarkButton className="submit-btn" onClick={(event) => handleSubmit(event)}>Create account</DarkButton>
        </form>
      </LoginFormContainer>
    </MainContainer>
  )
}

export default SignUp;
