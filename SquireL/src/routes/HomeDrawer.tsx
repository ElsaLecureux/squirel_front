import { Button } from 'react-native';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PlayroomScreen from '../screens/PlayRoomScreen/PlayroomScreen';
import MemoryScreen from '../screens/MemoryScreen/MemoryScreen';

import HomeButton from '../components/Buttons/HomeButton';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function HomeDrawer ({navigation}) {

        return (
          <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerTransparent: true }}>
            <Drawer.Screen name="Home" component={ HomeScreen } />
            <Drawer.Screen 
              name="Profile" 
              component={ ProfileScreen } 
              options={{
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return <Button
                      title='Home'
                      onPress={() => navigation.navigate('Home')}
                    />
                  }
              }}
            />
            <Drawer.Screen name="Playroom" component={ PlayroomScreen } />
            <Drawer.Screen name="Memory" component={ MemoryScreen } />
          </Drawer.Navigator>
        );

}