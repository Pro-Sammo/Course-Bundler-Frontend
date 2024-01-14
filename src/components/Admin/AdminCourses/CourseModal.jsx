import {
  Box,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Button,
  Text,
  VStack,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { RiDeleteBinFill } from 'react-icons/ri';
import { fileUploadCss } from '../../Auth/Register';

const CourseModal = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  courseTitle,
  addLectureHandler,
  lectures = [],
  loading
}) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [video, setVideo] = useState();
  const [videoPrev, setVideoPrev] = useState();

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrev('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeHandler}
      size="full"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{courseTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={'16'}>
          <Grid templateColumns={['1fr', '3fr 1fr']}>
            <Box px={['0', '16']}>
              <Box my={'5'}>
                <Heading>{courseTitle}</Heading>
                <Heading size={'sm'} opacity={0.4}>{`#${id}`}</Heading>
              </Box>
              <Heading size={'lg'}>Lecture</Heading>
              {Array.isArray(lectures) ? (
                lectures.map((item, i) => (
                  <VideoCard
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    num={i + 1}
                    lectureId={item._id}
                    courseId={id}
                    deleteButtonHandler={deleteButtonHandler}
                    loading={loading}
                  />
                ))
              ) : (
                <p>No lectures found.</p>
              )}
            </Box>
            <Box>
              <form
                onSubmit={e =>
                  addLectureHandler(e, id, title, description, video)
                }
              >
                <VStack spacing={'4'}>
                  <Heading size={'md'} textTransform="uppercase">
                    Add Lecture
                  </Heading>
                  <Input
                    focusBorderColor="purple.400"
                    placeholder="Title"
                    value={title || ''}
                    onChange={e => setTitle(e.target.value)}
                  />
                  <Input
                    focusBorderColor="purple.400"
                    placeholder="Description"
                    value={description || ''}
                    onChange={e => setDescription(e.target.value)}
                  />
                  <Input
                    accept="video/mp4"
                    required
                    type="file"
                    focusBorderColor={'purple.400'}
                    border="none"
                    onChange={changeVideoHandler}
                    css={{
                      '&::file-selector-button': {
                        ...fileUploadCss,
                        color: 'purple',
                      },
                    }}
                  />
                  {videoPrev && (
                    <video
                      controlsList=" nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}
                  <Button isLoading={loading} w={'full'} colorScheme="purple" type="submit">
                    Upload
                  </Button>
                </VStack>
              </form>
            </Box>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading
}) {
  return (
    <Stack
      direction={['column', 'row']}
      my="8"
      borderRadius={'lg'}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
      justifyContent={['flex-start', 'space-between']}
      p={['4', '8']}
    >
      <Box>
        <Heading size={'sm'} children={`#${num} ${title}`} />
        <Text>{description}</Text>
      </Box>
      <Button
        isDisabled={loading}
        color={'purple.600'}
        onClick={() => deleteButtonHandler(courseId, lectureId)}
      >
        <RiDeleteBinFill />
      </Button>
    </Stack>
  );
}
