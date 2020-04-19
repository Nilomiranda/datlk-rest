import React from 'react';
import api from '../common/api';
import { useHistory } from 'react-router-dom';
import { Heading, Flex, Button } from 'rebass/styled-components';

const Header = () => {
  const history = useHistory();

  const signOut = async () => {
    try {
      await api(true).delete('session');
      deleteTokenFromStorage();
      history.push('/sign-in');
    } catch (err) {
      console.error('DEBUG:: Error when signin out -> ', err);
    }
  };

  const deleteTokenFromStorage = () => {
    localStorage.removeItem('DTALK_TOKEN');
  };

  return (
    <Flex justifyContent="space-between" width={1} bg="white" padding={20}>
      <Button variant="primaryTransparent" onClick={() => signOut()}>
        Sign out
      </Button>
      <Heading color="black" fontSize={[5, 6, 6]} width="90%" textAlign="center">
        Publications
      </Heading>
    </Flex>
  );
};

export default Header;
