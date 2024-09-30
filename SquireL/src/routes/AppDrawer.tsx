import { createDrawerNavigator } from '@react-navigation/drawer';

import { Button } from 'react-native';

import HomeStack from './HomeStack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PlayroomStack from './PlayroomStack';
import DrawingsBoxScreen from '../screens/DrawingsBoxScreen/DrawingsBoxScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer ({navigation}) {

        return (
          <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Drawer.Screen 
              name="HomeStack" 
              component={ HomeStack } 
            />
            <Drawer.Screen 
              name="Profile" 
              component={ ProfileScreen } 
              options={{
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return <Button
                      title='Home'
                      onPress={() => navigation.navigate('HomeStack', {screen:'Home'})}
                    />
                  }
              }}
            />
            <Drawer.Screen 
              name="PlayroomStack" 
              component={ PlayroomStack }
              options={{
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return <Button
                      title='Home'
                      onPress={() => navigation.navigate('HomeStack', {screen:'Home'})}
                    />
                  }
              }}
            />
            <Drawer.Screen 
              name="DrawingsBox" 
              component={ DrawingsBoxScreen }
              options={{
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return <Button
                      title='Playroom'
                      onPress={() => navigation.navigate('PlayroomStack', {screen:'Playroom'})}
                    />
                  }
              }} 
            />
          </Drawer.Navigator>
        );

}