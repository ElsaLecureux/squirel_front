import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Button } from 'react-native';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MemoryScreen from '../screens/MemoryScreen/MemoryScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack ({navigation}) {

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