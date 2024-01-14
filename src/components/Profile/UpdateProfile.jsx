import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { getMyProfile } from '../../redux/actions/user';

const UpdateProfile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const {loading,message,error} = useSelector(state=>state.profile)
  const dispatch = useDispatch()

  const submitHandle =async e => {
    e.preventDefault();
   await dispatch(updateProfile(name,email))
    dispatch(getMyProfile())
    setName('');
    setEmail('');
  };


  useEffect(()=>{
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
  },[message,error])

  return (
    <Container py={'16'} minH="90vh">
      <form onSubmit={e => submitHandle(e)}>
        <Heading textTransform={'uppercase'} my="16" textAlign={'center'}>
          Update Profile
        </Heading>

        <VStack spacing={'8'}>
          <Input
            id="name"
            onChange={e => setName(e.target.value)}
            value={name || ''}
            placeholder="name"
            type={'text'}
            focusBorderColor="yellow.500"
          />
          <Input
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email || ''}
            placeholder="email"
            type={'email'}
            focusBorderColor="yellow.500"
          />
          <Button isLoading={loading} w={'full'} type={'submit'} colorScheme={'yellow'}>
            Update Profile
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
