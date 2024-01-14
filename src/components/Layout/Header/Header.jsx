import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import {
  RiDatabaseFill,
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiMenu5Fill,
  RiProfileLine,
} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url, title, onClose }) => (
  <Link to={url} onClick={onClose}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

const Header = ({isAuthenticated,user}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();


  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    onClose();
  };
  return (
    <>
      <ColorModeSwitcher position="fixed" right="8px" top="12px" />
      <Button
        zIndex={'overlay'}
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height="12"
        rounded="full"
        position={'fixed'}
        top="6"
        left={'6'}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay children="Home" backdropFilter={'blur(2px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>COURSE SELLING</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />
              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom={'2rem'}
                width="80%"
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link to="/profile" onClick={onClose}>
                          <Button variant={'solid'} colorScheme={'yellow'}>
                            <RiProfileLine style={{ margin: '4px' }} />
                            Profile
                          </Button>
                        </Link>

                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine style={{ margin: '4px' }} />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button colorScheme={'purple'} variant={'ghost'}>
                            <RiDatabaseFill style={{ margin: '4px' }} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to="/login">
                      <Button colorScheme={'yellow'}>
                        <RiLoginBoxLine style={{ margin: '4px' }} />
                        Login
                      </Button>
                    </Link>

                    <p>OR</p>

                    <Link onClick={onClose} to="/register">
                      <Button colorScheme={'yellow'}>
                        <RiLogoutBoxLine style={{ margin: '4px' }} />
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
