import {
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../../redux/actions/course';
import { toast } from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { getMyProfile } from '../../redux/actions/user';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <VStack
      className="course"
      alignItems={['center', 'flex-start']}
      paddingY="8"
    >
      <Image src={imageSrc} boxSize="60" objectFit={'contain'} />
      <Heading
        textAlign={['center', 'left']}
        maxW="200px"
        fontFamily={'sans-serif'}
        noOfLines={3}
        size="sm"
      >
        {title}
      </Heading>
      <Text noOfLines={2}>{description}</Text>
      <HStack>
        <Text fontSize={'sm'} fontWeight={'bold'} textTransform="uppercase">
          Creator
        </Text>
        <Text fontSize={'sm'} fontFamily="body" textTransform="uppercase">
          {creator}
        </Text>
      </HStack>
      <Heading textAlign={'center'} size="xs" textTransform={'uppercase'}>
        Lecture - {lectureCount}
      </Heading>
      <Heading size="xs" textTransform={'uppercase'}>
        Views - {views}
      </Heading>
      <Stack direction={['column', 'row']} alignItems="center">
        <Link to={`/course/${id}`}>
          <Button colorScheme={'yellow'}>Watch Now</Button>
        </Link>
        <Button
          isLoading={loading}
          variant={'ghost'}
          colorScheme="yellow"
          onClick={() => addToPlaylistHandler(id)}
        >
          Add to Playlist
        </Button>
      </Stack>
    </VStack>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState();
  const [category, setCategory] = useState();

  const dispatch = useDispatch();
  const { loading, courses, error, message } = useSelector(
    state => state.courses
  );

  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(getMyProfile());
  };

  const handleAllCategory=()=>{
    setCategory('')
  }

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure and Algorithm',
    'App development',
    'Game development',
    'Data Science',
  ];

  useEffect(() => {
    dispatch(getAllCourses(keyword, category));
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, error, message]);

  return (
    <Container minW={'50%'}>
      <Heading m={'8'} children="All Courses" textAlign={'center'} />
      <Input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={'text'}
        focusBorderColor="yellow.500"
      />
      <HStack
        overflowX={'scroll'}
        paddingY="8"
        css={{
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'yellow',
            outline: '1px solid slategray',
          },
        }}
      >
        <Button variant={'ghost'} minWidth={'60'} onClick={handleAllCategory}>
          <Text>All</Text>
        </Button>
        {categories.map((item, index) => (
          <Button
            variant={'ghost'}
            key={index}
            onClick={() => setCategory(item)}
            minWidth={'60'}
          >
            <Text>{item}</Text>
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['flex-start', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <Heading style={{height:'80vh'}} display={'flex'} alignItems={'center'}>Course Not Found</Heading>
        )}
      </Stack>
    </Container>
  );
};

export default Courses;
