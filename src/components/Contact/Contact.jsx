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

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <Container h={'90vh'}>
      <VStack my={'16'}>
        <Heading>Contact Us</Heading>

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
            <FormLabel htmlFor="message">Message</FormLabel>
            <Textarea
              required
              id="message"
              value={message}
              focusBorderColor={'yellow.500'}
              onChange={e => setMessage(e.target.value)}
              placeholder="Your Message..."
            />
          </Box>
          <Button my={'4'} colorScheme="yellow" type="submit">
            Send Mail
          </Button>

          <Box my={'4'}>
            Request for a course?{' '}
            <Link to={'/request'}>
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

export default Contact;
