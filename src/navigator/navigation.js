import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import VideoList from '../screens/VideoList';
import PlayVideo from '../screens/PlayVideo';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="videoList" component={VideoList} />
      <Stack.Screen name="playVideo" component={PlayVideo} />
    </Stack.Navigator>
  );
};

export default Navigation = () => {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
};
