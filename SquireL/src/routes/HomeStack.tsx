import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MemoryScreen from '../screens/MemoryScreen/MemoryScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

type PlayroomStackNavigationProp = StackNavigationProp<
  HomeStackParamList
>;

type Props = {
  navigation: PlayroomStackNavigationProp;
};

export default function HomeStack ({navigation}: Props) {

        return (
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="Home" 
              component={ HomeScreen }
            />
            <Stack.Screen 
              name="Memory" 
              component={ MemoryScreen }
            />          
          </Stack.Navigator>
        );

}