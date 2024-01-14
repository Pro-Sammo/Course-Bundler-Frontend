import {
  Container,
  FormLabel,
  Heading,
  VStack,
  Input,
  Box,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/user';

const Login = () => {
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(login(email,password))
    setEmail("")
    setPassword("")
  }
  return (
    <Container h={'88vh'}>
      <VStack h={'full'} justifyContent="center" spacing={'4'}>
        <Heading textAlign={'center'} fontSize={['25', '36']}>
          Welcome to Course Selling
        </Heading>
        <form style={{ width: '100%' }} onSubmit={e => submitHandler(e)}>
          <Box my={'4'}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              required
              id="email"
              value={email}
              type="email"
              focusBorderColor={'yellow.500'}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              required
              id="password"
              value={password}
              type="password"
              focusBorderColor={'yellow.500'}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter you password"
            />
          </Box>
          <Box
            display={'flex'}
            justifyContent="flex-start"
            width={['58%', '40%']}
          >
            <Link to="/forgerpassword">
              <Button fontSize={'sm'} color={'yellow.400'} variant="link">
                Forger Password
              </Button>
            </Link>
          </Box>
          <Button my={'4'} colorScheme="yellow" type="submit">
            Login
          </Button>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
