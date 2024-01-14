import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { password, setPassword } = useState();

  const params = useParams();

  return (
    <Container h={'90vh'} py="16">
      <form action="">
        <Heading my={'16'} textTransform={'uppercase'} textAlign="center">
          Reset Password
        </Heading>
        <VStack spacing={'8'}>
          <Input
            required
            value={password}
            type="password"
            focusBorderColor={'yellow.500'}
            onChange={e => setPassword(e.target.value)}
          />
          <Button type="submit" w={'full'} colorScheme="yellow">
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ResetPassword;
