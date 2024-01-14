import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import Sidebar from '../Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
import Loader from '../../Layout/Loader/Loader';

const Users = () => {
  const { users, loading } = useSelector(state => state.admin);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const updateHandler = async userId => {
    await dispatch(updateUserRole(userId));
    dispatch(getAllUsers());
  };
  const deleteHandler = async userId => {
    await dispatch(deleteUser(userId));
    dispatch(getAllUsers());
  };

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      {!users ? (
        <Loader color="purple.500" />
      ) : (
        <Box p={['0', '16']} overflowX="auto">
          <Heading textTransform={'uppercase'} my="16" textAlign={'center'}>
            All Users
          </Heading>
          <TableContainer w={['100vw', 'full']}>
            <Table variant={'simple'} size="lg">
              <TableCaption>All available users in the database</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Role</Th>
                  <Th>Subscription</Th>
                  <Th isNumeric>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map(item => (
                  <Row
                    key={item._id}
                    item={item}
                    updateHandler={updateHandler}
                    deleteHandler={deleteHandler}
                    loading={loading}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Sidebar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>{item.subscription.status === 'active' ? 'Active' : 'Not Active'}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            isDisabled={loading}
            onClick={() => updateHandler(item._id)}
            variant="outline"
            color="purple.400"
          >
            Change Role
          </Button>
          <Button
            isDisabled={loading}
            variant="outline"
            color="purple.400"
          >
            {item.subscription.status === 'active' ? 'deactive' : 'active'}
          </Button>
          <Button
            isDisabled={loading}
            onClick={() => deleteHandler(item._id)}
            color={'purple.600'}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
