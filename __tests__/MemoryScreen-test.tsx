import React from 'react';
import MemoryScreen from '../src/screens/MemoryScreen/MemoryScreen';
import { render, screen } from '@testing-library/react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../src/types/navigationTypes';
import { UserProvider } from '../src/context/UserContext';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native').View;
  return {
    GestureHandlerRootView: View,
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    TapGestureHandler: View,
    LongPressGestureHandler: View,
    NativeViewGestureHandler: View,
    default: {
      install: jest.fn(),
    },
  };
});

//mock tamagui so jest can recognize the elements
jest.mock('tamagui', () => {
  const { Text, View, Image } = require('react-native');
  return {
    Text,
    View,
    Image,
    XStack: View,
    YStack: View,
    Button: View,
  };
});

// mock fontawesome so the lib doesn't cause pb for jest
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => <div />,
}));

const Stack = createStackNavigator<HomeStackParamList>();

describe('<MemoryScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Memory text correctly', () => {
    render(
      <NavigationContainer>
        <UserProvider>
          <Stack.Navigator>
            <Stack.Screen name="Memory" component={MemoryScreen} />
          </Stack.Navigator>
        </UserProvider>
      </NavigationContainer>,
    );

    // Use screen.getByText for better error messaging
    const memoryText = screen.getByText('Memory');
    expect(memoryText).toBeTruthy();
  });
});
