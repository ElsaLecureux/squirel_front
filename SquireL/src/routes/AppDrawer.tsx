import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerNavigationProp  } from '@react-navigation/drawer';

import HomeStack from './HomeStack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PlayroomStack from './PlayroomStack';
import DrawingsBoxScreen from '../screens/DrawingsBoxScreen/DrawingsBoxScreen';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';

import { Button, XStack, YStack } from 'tamagui';

const Drawer = createDrawerNavigator<AppDrawerParamList>();

type AppDrawerNavigationProp = DrawerNavigationProp <
  AppDrawerParamList
>;

type Props = {
  navigation: AppDrawerNavigationProp;
};

export default function AppDrawer ({navigation}: Props) {

  const renderHeaderRight = (currentRoute: string | undefined) => {
    if (currentRoute !== 'Home') {
      return (
        <XStack
          marginRight='3%'
          marginTop='3%'
          gap={10}
        >
          <Button
            size="$2"
            height={40}
            variant="outlined"
            borderColor="#953990" 
            onPress={() => navigation.navigate('Profile')}>
            <FontAwesomeIcon icon={faUser} style={{color: "#953990",}} size={25}/>  
          </Button>
          <Button
            size="$2"
            height={40}
            variant="outlined"
            borderColor="#ff8a01" 
            onPress={() => navigation.navigate('HomeStack', { screen: 'Home' })}>
            <FontAwesomeIcon icon={faHouse} style={{color: "#ff8a01",}} size={25}/>
          </Button>
          </XStack>   
      );
    } else if (currentRoute === 'Home') {
      return (
        <XStack
          marginRight='3%'
          marginTop='3%'
        >
          <Button
          size="$2"
          height={40}
          variant="outlined"
          borderColor="#953990" 
          onPress={() => navigation.navigate('Profile')}>
            <FontAwesomeIcon icon={faUser} style={{color: "#953990",}} size={25}/>  
          </Button>
        </XStack>
        
      )
    }
    return null;
  };

        return (
          <Drawer.Navigator initialRouteName="HomeStack" screenOptions={{ headerTransparent: true }}>
            <Drawer.Screen 
              name="HomeStack" 
              component={ HomeStack }
              options={({ route }) => {
                const currentRoute = route.name === 'HomeStack'
                  ? getFocusedRouteNameFromRoute(route) ?? 'Home'
                  : undefined;
        
                return {
                  title: 'Home' ,
                  headerTransparent: true,
                  headerTitleStyle: {display:'none'},
                  headerRight: () => renderHeaderRight(currentRoute),
                };
              }}
            />
            <Drawer.Screen 
              name="Profile" 
              component={ ProfileScreen } 
              options={{
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return  <XStack
                    marginRight='3%'
                    marginTop='3%'
                  >
                    <Button
                      size="$2"
                      height={40}
                      variant="outlined"
                      borderColor="#ff8a01" 
                      onPress={() => navigation.navigate('HomeStack', { screen: 'Home' })}>
                      <FontAwesomeIcon icon={faHouse} style={{color: "#ff8a01",}} size={25}/>
                    </Button>
                    </XStack>
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
                  return  <XStack
                  marginRight='3%'
                  marginTop='3%'
                  gap={10}
                >
                  <Button
                    size="$2"
                    height={40}
                    variant="outlined"
                    borderColor="#953990" 
                    onPress={() => navigation.navigate('Profile')}>
                    <FontAwesomeIcon icon={faUser} style={{color: "#953990",}} size={25}/>  
                  </Button>
                  <Button
                    size="$2"
                    height={40}
                    variant="outlined"
                    borderColor="#ff8a01" 
                    onPress={() => navigation.navigate('HomeStack', { screen: 'Home' })}>
                    <FontAwesomeIcon icon={faHouse} style={{color: "#ff8a01",}} size={25}/>
                  </Button>
                  </XStack>
                }
              }}
            />
            <Drawer.Screen 
              name="DrawingsBox" 
              component={ DrawingsBoxScreen }
              options={{
                headerTitleStyle: {display:'none'},
                headerRight: () => {
                  return  <XStack
                  marginRight='3%'
                  marginTop='3%'
                  gap={10}
                >
                  <Button
                    size="$2"
                    height={40}
                    variant="outlined"
                    borderColor="#953990" 
                    onPress={() => navigation.navigate('Profile')}>
                    <FontAwesomeIcon icon={faUser} style={{color: "#953990",}} size={25}/>  
                  </Button>
                  <Button
                    size="$2"
                    height={40}
                    variant="outlined"
                    borderColor="#ff8a01" 
                    onPress={() => navigation.navigate('HomeStack', { screen: 'Home' })}>
                    <FontAwesomeIcon icon={faHouse} style={{color: "#ff8a01",}} size={25}/>
                  </Button>
                  </XStack>
                  }
              }} 
            />
          </Drawer.Navigator>
        );

}