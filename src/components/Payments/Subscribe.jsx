import {
  Container,
  Heading,
  VStack,
  Text,
  Box,
  Button,
} from '@chakra-ui/react';
import React from 'react';

const Subscribe = () => {
  return (
    <Container py={'16'} h="90vh">
      <Heading w={'full'} textAlign="center">
        Welcome
      </Heading>
      <VStack w={'full'} alignItems="stretch" mt="8" boxShadow={'lg'}>
        <Box
          css={{ borderRadius: '8px 8px 0 0' }}
          padding={'4'}
          bg={'yellow.400'}
        >
          <Text size="sm">
            Pro Pack - <span style={{ fontSize: '20px' }}>৳</span>299.00
          </Text>
        </Box>
        <Box padding={'4'}>
          <Text py={'4'} textAlign="center">
            Join pro pack to get access to all content
          </Text>
          <Text fontWeight={'600'} textAlign="center">
            <span style={{ fontSize: '20px' }}>৳</span>299.00 Only
          </Text>
          <Button mt={'4'} w={'full'} colorScheme={'yellow'}>
            Buy Now
          </Button>
        </Box>
        <Box
          bg={'blackAlpha.600'}
          p={'4'}
          css={{ borderRadius: '0 0 8px 8px' }}
        >
          <Heading size={'sm'} color={'white'} textTransform="uppercase">
            100% refund at cancellation
          </Heading>
          <Text fontSize={'xs'} color='white'>*Terms & Conditions Apply</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Subscribe;
