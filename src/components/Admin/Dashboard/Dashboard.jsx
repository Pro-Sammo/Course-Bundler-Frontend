import {
  Box,
  Grid,
  Text,
  Heading,
  Stack,
  HStack,
  Progress,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';

import Sidebar from '../Sidebar/Sidebar';
import { DoughnutChart, LineChart } from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';
import Loader from '../../Layout/Loader/Loader';

const Databox = ({ title, qty, qtyPercentage, profit }) => {
  return (
    <Box
      p={'8'}
      borderRadius={'lg'}
      w={['full', '20%']}
      boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
    >
      <Text>{title}</Text>
      <HStack spacing={'6'}>
        <Text fontSize={'2xl'} fontWeight="bold">
          {qty}
        </Text>

        <HStack>
          <Text>{`${qtyPercentage}%`}</Text>
          {profit ? (
            <RiArrowUpLine color="green" />
          ) : (
            <RiArrowDownLine color="red" />
          )}
        </HStack>
      </HStack>
      <Text opacity={'0.6'}>Since Last Month</Text>
    </Box>
  );
};

const Bar = ({ title, value, profit }) => (
  <Box py={' 4'} px={['0', '20']}>
    <Heading size={'sm'} mb="2">
      {title}
    </Heading>
    <HStack width={'full'} alignItems={'center'}>
      <Text>{profit ? '0%' : `-${value}`}</Text>
      <Progress w={' full'} value={profit ? value : 0} colorScheme="purple" />
      <Text children={`${value > 100 ? value : 100}%`} />
    </HStack>
  </Box>
);

const Dashboard = () => {
  const dispatch = useDispatch();

  const [views, setViews] = useState([]);

  const {
    loading,
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  } = useSelector(state => state.admin);

  if (stats) {
    var videoArray = stats.map(item => item.views);
  }
  

  useEffect(() => {
    dispatch(getDashboardStats());
  }, []);

  return (
    <Grid minH={'100vh'} templateColumns={['1fr', '5fr 1fr']}>
      {loading || !stats ? (
        <Loader color="purple.500" />
      ) : (
        <Box boxSizing="border-box" py={'16'} px={['4', '0']}>
          <Text
            textAlign={'center'}
            opacity="0.8"
            children={`Last Change was on ${
              String(new Date(stats[11].createdAt)).split('G')[0]
            }`}
          />
          <Heading ml={['0', '16']} mb="16" textAlign={['center', 'left']}>
            Dashboard
          </Heading>
          <Stack
            direction={['column', 'row']}
            minH="24"
            justifyContent={'space-evenly'}
          >
            <Databox
              title="Views"
              qty={viewsCount}
              qtyPercentage={viewsPercentage}
              profit={viewsProfit}
            />
            <Databox
              title="Users"
              qty={usersCount}
              qtyPercentage={usersPercentage}
              profit={usersProfit}
            />
            <Databox
              title="Subscription"
              qty={subscriptionCount}
              qtyPercentage={subscriptionPercentage}
              profit={subscriptionProfit}
            />
          </Stack>
          <Box
            m={['0', '16']}
            borderRadius="lg"
            p={['0', '16']}
            mt={['4', '16']}
            boxShadow={'0 0 10px rgba(107,70,193,0.5)'}
          >
            <Heading
              textAlign={['center', 'left']}
              size="md"
              pt={['8', '0']}
              ml={['0', '16']}
            >
              Views Graph
            </Heading>
            {/* Line Graph here */}
            {}
            <LineChart viewsdata={videoArray} />
          </Box>
          <Grid templateColumns={[' 1fr', ' 2fr 1fr']}>
            <Box p={' 4'}>
              <Heading
                textAlign={('center', ' left')}
                size=" md"
                my={'8'}
                ml={['0', '16']}
              >
                Progress Bar
              </Heading>
              <Box>
                <Bar
                  title="Views"
                  value={viewsPercentage}
                  profit={viewsProfit}
                />
                <Bar
                  title="Users"
                  value={usersPercentage}
                  profit={usersProfit}
                />
                <Bar
                  title="Subscription"
                  value={subscriptionCount}
                  profit={subscriptionProfit}
                />
              </Box>
            </Box>
            <Box p={['0', ' 16']} py="4" boxSizing="border-box">
              <Heading
                textAlign={'center'}
                size="md"
                mb={'4'}
                children=" Users"
              />
              <DoughnutChart
                users={[subscriptionCount, usersCount - subscriptionCount]}
              />
            </Box>
          </Grid>
        </Box>
      )}

      <Sidebar />
    </Grid>
  );
};

export default Dashboard;
