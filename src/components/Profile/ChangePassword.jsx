import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import { toast } from 'react-hot-toast';
import { Form } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const { loading, message, error } = useSelector(state => state.profile);
  const dispatch = useDispatch();


  const submitHandle = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword,newPassword));
    setOldPassword('');
    setNewPassword('');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [message, error]);

  return (
    <Container py={'16'} minH="90vh">
      <form onSubmit={e => submitHandle(e)}>
        <Heading textTransform={'uppercase'} my="16" textAlign={'center'}>
          Change password
        </Heading>

        <VStack spacing={'8'}>
          <Input
            required
            id="password"
            onChange={e => setOldPassword(e.target.value)}
            value={oldPassword || ''}
            placeholder="Enter Old Password"
            type={'password'}
            focusBorderColor="yellow.500"
          />
          <Input
            required
            id="password"
            onChange={e => setNewPassword(e.target.value)}
            value={newPassword || ''}
            placeholder="Enter New Password"
            type={'password'}
            focusBorderColor="yellow.500"
          />
          <Button
            isLoading={loading}
            w={'full'}
            type={'submit'}
            colorScheme={'yellow'}
          >
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default ChangePassword;
