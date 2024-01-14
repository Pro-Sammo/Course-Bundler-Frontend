import {
  Container,
  FormLabel,
  Heading,
  VStack,
  Input,
  Box,
  Button,
  Avatar,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const fileUploadStyle = {
  '&::file-selector-button': fileUploadCss,
};

const Register = () => {
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [imagePrev, setImageprev] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState();

  const dispatch = useDispatch()


  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageprev(reader.result);
      setImage(file);
    };
  };

  const submitHandler =(e)=>{
    e.preventDefault()
    const myForm = new FormData()
    myForm.append("name",name)
    myForm.append("email",email)
    myForm.append("password",password)
    myForm.append("file",image)
    dispatch(register(myForm))
  }

  return (
    <Container h={'95vh'}>
      <VStack
        h={'full'}
        width="64"
        justifyContent="center"
        spacing={'4'}
        margin="auto"
      >
        <Heading
          textTransform={'uppercase'}
          textAlign={'center'}
          fontSize={['25', '36']}
        >
          registration
        </Heading>
        <Box>
          <Avatar src={imagePrev} boxSize={'36'} />
        </Box>
        <form style={{ width: '100%' }} onSubmit={submitHandler}>
        
        <Box my={'4'} width="100%">
          
            <FormLabel htmlFor="email">Name</FormLabel>
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
        <Box my={'4'} width="100%">
          
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
        <Box width="100%">
          
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
        <Box width="100%">
          
            <FormLabel htmlFor="password">Choose Avatar</FormLabel>
            <Input
              accept="image/*"
              required
              id="chooseavatar"
              type="file"
              focusBorderColor={'yellow.500'}
              css={fileUploadStyle}
              border="none"
              onChange={changeImageHandler}
            />
          
        </Box>
        <Button my={'4'} colorScheme="yellow" type="submit">
          Sign Up
        </Button>
        </form>
        <Box my={'4'}>
          Already Signed Up?{' '}
          <Link to="/login">
            <Button colorScheme={'yellow'} variant="link">
              Login here
            </Button>
          </Link>
        </Box>
        
      </VStack>
    </Container>
  );
};

export default Register;
