import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerNavigationProp  } from '@react-navigation/drawer';

import { TouchableOpacity, Text } from 'react-native';

import HomeStack from './HomeStack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PlayroomStack from './PlayroomStack';
import DrawingsBoxScreen from '../screens/DrawingsBoxScreen/DrawingsBoxScreen';

const Drawer = createDrawerNavigator<AppDrawerParamList>();

type AppDrawerNavigationProp = DrawerNavigationProp <
  AppDrawerParamList
>;

type Props = {
  navigation: AppDrawerNavigationProp;
};

//screenOptions={{ headerTransparent: true }} might be the issue with the buttons

export default function AppDrawer ({navigation}: Props) {

        return (
          <Drawer.Navigator initialRouteName="HomeStack" screenOptions={{ headerTransparent: true }}>
            <Drawer.Screen 
              name="HomeStack" 
              component={ HomeStack }
              options={{
                title: 'Home' ,
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return <TouchableOpacity
                      onPress={() => navigation.navigate('HomeStack', {screen:'Home'})}
                    >
                      <Text>Home</Text>
                    </TouchableOpacity>
                }
              }}

            />
            <Drawer.Screen 
              name="Profile" 
              component={ ProfileScreen } 
              options={{
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return <TouchableOpacity
                      onPress={() => navigation.navigate('HomeStack', {screen:'Home'})}
                    >
                      <Text>Home</Text>
                    </TouchableOpacity>
                  }
              }}
            />
            <Drawer.Screen 
              name="PlayroomStack" 
              component={ PlayroomStack }
              options={{
                title: 'Playroom' ,
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return <TouchableOpacity
                      onPress={() => navigation.navigate('HomeStack', {screen:'Home'})}
                    >
                      <Text>Home</Text>
                    </TouchableOpacity>
                  }
              }}
            />
            <Drawer.Screen 
              name="DrawingsBox" 
              component={ DrawingsBoxScreen }
              options={{
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return <TouchableOpacity
                      onPress={() => navigation.navigate('PlayroomStack', {screen:'Playroom'})}
                    >
                      <Text>Playroom</Text>
                    </TouchableOpacity>
                  }
              }} 
            />
          </Drawer.Navigator>
        );

}