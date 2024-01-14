import {
  Avatar,
  Container,
  Heading,
  Stack,
  VStack,
  Button,
  HStack,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  useDisclosure,
  ModalHeader,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import React, { useEffect, useState } from 'react';
import { fileUploadCss } from '../Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPlaylist, updateProfilePicture } from '../../redux/actions/profile';
import Loader from '../Layout/Loader/Loader';
import { getMyProfile } from '../../redux/actions/user';
import { toast } from 'react-hot-toast';


const Profile = ({user}) => {
  const Authenticated = useSelector(state=>state.user)
  const {loading,message,error} = useSelector(state=>state.profile)

  const dispatch = useDispatch()
  
  const removePlaylistHandler =async id => {
   await dispatch(removeFromPlaylist(id))
    dispatch(getMyProfile())

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

  const { isOpen, onClose, onOpen } = useDisclosure();

  const changeImageSubmitHandler = async(e, image) => {
    e.preventDefault();
    const myForm = new FormData()
    myForm.append('file',image)
   await dispatch(updateProfilePicture(myForm))
    dispatch(getMyProfile())
  };

  if(!Authenticated.isAutenticated){
    return <Loader/>
  }

  return (
    <Container minH={'95vh'} maxW="container.lg" py={'8'}>
      <Heading m={'8'} textTransform="uppercase">
        Profile
      </Heading>
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
        padding="8"
      >
        <VStack>
          <Avatar boxSize={'48'} src={user.avatar.url} />
          <Button onClick={onOpen} colorScheme={'yellow'} variant="ghost">
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text fontWeight={'bold'}>Name</Text>
            <Text>{user.name}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>Email</Text>
            <Text>{user.email}</Text>
          </HStack>
          <HStack>
            <Text fontWeight={'bold'}>CreatedAt</Text>
            <Text>{user.createdAt.split('T')[0]}</Text>
          </HStack>
          <HStack>
            {user.role !== 'admin' && (
              <HStack>
                <Text fontWeight={'bold'}>Subscription</Text>
                {user.subscription.status === 'active' ? (
                  <Button color={'yellow.500'}>Cancel Subscription</Button>
                ) : (
                  <Link to="/subscribe">
                    <Button colorScheme={'yellow'}>Subscribe</Button>
                  </Link>
                )}
              </HStack>
            )}
          </HStack>
          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>
            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading size={'md'} my="8">
        {' '}
        Playlist
      </Heading>
      {user.playlist.length > 0 && (
        <Stack
          flexWrap={'wrap'}
          direction={['column', 'row']}
          alignItems={'center'}
          p="4"
        >
          {user.playlist.map((element, index) => (
            <VStack w={'48'} m="4" key="element.course">
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />
              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>
                <Button isLoading={loading} onClick={() => removePlaylistHandler(element.course)}>
                  <RiDeleteBin2Fill size={'18'} />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
      <ChangePhoto
        changeImageSubmitHandler={changeImageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
      />
    </Container>
  );
};

export default Profile;

function ChangePhoto({ isOpen, onClose, changeImageSubmitHandler,loading }) {
  const [image, setImage] = useState('');
  const [imagePrev, setImageprev] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageprev(reader.result);
      setImage(file);
    };
  };

  const chaneHandle = () => {
    onClose();
    setImage('');
    setImageprev('');
  };

  return (
    <Modal isOpen={isOpen} onClose={chaneHandle}>
      <ModalOverlay backdropFilter={'blur(5 px)'} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}
                <Input
                  onChange={changeImage}
                  type={'file'}
                  css={{ '&::file-selector-button': fileUploadCss }}
                />
                <Button isLoading={loading} w={'full'} colorScheme={'yellow'} type="submit">
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button onClick={chaneHandle} mr={'3'}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
