import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';
import { DiGithub } from 'react-icons/di';

const Footer = () => {
  return (
    <Stack
      bg={'blackAlpha.900'}
      padding="5"
      spacing={['5', '1']}
      direction={['column', 'row']}
      justifyContent="space-between"
      alignItems={'center'}
    >
      <VStack alignItems={['center', 'flex-start']}>
        <Heading color={'white'} size="md">
          All Rights Reserved
        </Heading>
        <Heading color={'yellow.400'} size="sm" fontFamily={'body'}>
          @Sammo
        </Heading>
      </VStack>
      <HStack
        spacing={['2', '10']}
        justifyContent="center"
        color={'white'}
        fontSize="50"
      >
        <TiSocialYoutubeCircular />
        <TiSocialInstagramCircular />
        <DiGithub />
      </HStack>
    </Stack>
  );
};

export default Footer;
