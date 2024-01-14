import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Request = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');

  return (
    <Container h={'90vh'}>
      <VStack my={'16'}>
        <Heading>Request New Course</Heading>

        <form style={{ width: '100%' }}>
          <Box my={'4'}>
            <FormLabel htmlFor="name">Your Name</FormLabel>
            <Input
              required
              id="name"
              value={name}
              type="text"
              focusBorderColor={'yellow.500'}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
            />
          </Box>
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
          <Box my={'4'}>
            <FormLabel htmlFor="course">Course</FormLabel>
            <Textarea
              required
              id="course"
              value={course}
              focusBorderColor={'yellow.500'}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain The Course.."
            />
          </Box>
          <Button my={'4'} colorScheme="yellow" type="submit">
            Request
          </Button>

          <Box my={'4'}>
            See available courses?{' '}
            <Link to={'/courses'}>
              <Button colorScheme={'yellow'} variant="link">
                Click
              </Button>
            </Link>
            {' '}
            here
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Request;
