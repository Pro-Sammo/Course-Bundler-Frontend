import {
  Avatar,
  Container,
  Heading,
  Stack,
  VStack,
  Text,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const Founder = () => (
    <Stack
      direction={['column', 'row']}
      spacing={['4', '16']}
      padding={'8'}
      gap={['8', '0']}
    >
      <VStack>
        <Avatar size={['30', '40']} />
        <Text opacity={'0.7'}>Co-Founder</Text>
      </VStack>
      <VStack justifyContent={'center'}>
        <Heading fontSize={['md', '3xl']} textAlign={'center'}>
          Sirajam Sadekeen Sammo
        </Heading>
        <Text textAlign={'center'}>I am a Full Stack React developer.</Text>
      </VStack>
    </Stack>
  );

  return (
    <Container
      maxWidth={'container.lg'}
      marginY="16"
      h="90vh"
      padding="16"
      boxShadow={'lg'}
      css={{ boxShadow: '0px 0px 10px yellow' }}
      fontFamily="body"
    >
      <Heading pb={'16'} textAlign={'center'}>
        About Us
      </Heading>
      <Founder />
      <Stack direction={['column', 'row']} alignItems='center'>
        <Text textAlign={['center', 'left']}>
          We are a video streaming platform with some premium courses available
          only for premium users.
        </Text>
        <Link to={'/subscribe'}>
          <Button colorScheme={'yellow'} variant="link">
            Visite Out Plan
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default About;
