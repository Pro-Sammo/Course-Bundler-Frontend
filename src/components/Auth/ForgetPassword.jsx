import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

const ForgetPassword = () => {
  const { email, setEmail } = useState();
  return (
    <Container h={'90vh'} py="16">
      <form action="">
        <Heading my={'16'} textTransform={'uppercase'} textAlign="center">
          Forget Password
        </Heading>
        <VStack spacing={'8'}>
          <Input
            required
            value={email}
            type="email"
            focusBorderColor={'yellow.500'}
            onChange={e => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
          />
          <Button type="submit" w={'full'} colorScheme="yellow">
            Send Reset Link
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ForgetPassword;
