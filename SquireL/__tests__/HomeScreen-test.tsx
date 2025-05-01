import { fireEvent, render, screen } from '@testing-library/react-native';
import  HomeScreen from '@/src/screens/HomeScreen/HomeScreen';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';

jest.mock('tamagui', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  return {
    Text,
    View,
    Image: View,
    XStack: View,
    YStack: View,
    Button: ({ children, ...props }: any) => (
      <TouchableOpacity accessibilityLabel={props['aria-label']} {...props}>
        {children}
      </TouchableOpacity>
    ),
  };
});

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'Home'>;

const mockNavigate = jest.fn();
const mockParentNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  getParent: () => ({
    navigate: mockParentNavigate,
  }),
} as unknown as HomeScreenNavigationProp;

describe('<HomeScreen />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  test('button on Homescreen redirect to MemoryScreen', () => {
    render(<HomeScreen navigation={mockNavigation as HomeScreenNavigationProp} />);
    const button = screen.getByLabelText('goToMemoryButton');
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledWith('Memory');
  });

  test('renders background image', () => {
    render(<HomeScreen navigation={mockNavigation as HomeScreenNavigationProp} />);
    const backgroundImage = screen.getByTestId('background-image-home');
    expect(backgroundImage).toBeTruthy();
  })

});
