import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Button } from 'react-native';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MemoryScreen from '../screens/MemoryScreen/MemoryScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
export default function HomeStack ({navigation}) {

        return (
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Drawer.Screen 
              name="Home" 
              component={ HomeScreen }
            />
            <Drawer.Screen 
              name="Memory" 
              component={ MemoryScreen } 
              options={{
                headerRight: () => {
                  return <Button
                      title='Home'
                      onPress={() => navigation.navigate('Home')}
                    />
                  }
              }}
            />          
          </Stack.Navigator>
        );

}