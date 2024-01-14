import {
  Grid,
  Container,
  Heading,
  VStack,
  Input,
  Select,
  Image,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fileUploadCss } from '../../Auth/Register';
import Sidebar from '../Sidebar/Sidebar';
import { createCourse } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Createcourse = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState();



  const dispatch = useDispatch()
  const {loading,error,message}=useSelector(state=>state.admin)

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure and Algorithm',
    'App development',
    'Game development',
    'Data Science',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = async e => {
    e.preventDefault();

    const myForm = new FormData()
    myForm.append("title",title)
    myForm.append("description",description)
    myForm.append("category",category)
    myForm.append("createdBy",createdBy)
    myForm.append("file",image)

  await dispatch(createCourse(myForm))
    setTitle('');
    setDescription('');
    setCreatedBy('');
    setCategory('');
    setImagePrev('');
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
  }, [error, message]);

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      <Container py={'16'}>
        <form onSubmit={submitHandler}>
          <Heading textTransform={'uppercase'} my="16" textAlign={'center'}>
            Create Course
          </Heading>

          <VStack m={'auto'} spacing="8">
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor="purple.400"
            />
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.400"
            />
            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor="purple.400"
            />

            <Select
              focusBorderColor="purple.400"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map((item, index) => (
                <option key={index} value={item}>
                  {' '}
                  {item}{' '}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              type="file"
              focusBorderColor={'purple.400'}
              border="none"
              onChange={changeImageHandler}
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
            />
            {imagePrev && (
              <Image src={imagePrev} boxSize="64" objectFit={'contain'} />
            )}

            <Button isLoading={loading} w={'full'} colorScheme="purple" type="submit">
              Create
            </Button>
          </VStack>
        </form>
      </Container>

      <Sidebar />
    </Grid>
  );
};

export default Createcourse;
