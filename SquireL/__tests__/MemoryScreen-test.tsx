import React from 'react';
import MemoryScreen from "@/src/screens/MemoryScreen/MemoryScreen";
import { render, screen } from '@testing-library/react-native';
import { StackNavigationProp } from '@react-navigation/stack';

//mock tamagui so jest can recognize the elements
jest.mock('tamagui', () => {
    const React = require('react');
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

type MemoryScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Memory'>;

const mockNavigation: Partial<MemoryScreenNavigationProp> = {
  navigate: jest.fn(),
};

describe('<MemoryScreen />', () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Memory text correctly', () => {
        render(<MemoryScreen navigation={mockNavigation as MemoryScreenNavigationProp} />);

        // Use screen.getByText for better error messaging
        const memoryText = screen.getByText('Memory');
        expect(memoryText).toBeTruthy();
    });

});
