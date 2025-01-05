import { DrawerNavigationProp, createDrawerNavigator  } from '@react-navigation/drawer';

import HomeStack from './HomeStack';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PlayroomStack from './PlayroomStack';
import DrawingsBoxScreen from '../screens/DrawingsBoxScreen/DrawingsBoxScreen';
import { getFocusedRouteNameFromRoute, NavigationProp } from '@react-navigation/native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';

import { Button, XStack, View } from 'tamagui';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomDrawerContent from '../components/customeMenu';
import signOut from '../constants/signOut';

const Drawer = createDrawerNavigator<AppDrawerParamList>();

type AppDrawerNavigationProp = DrawerNavigationProp <
  AppDrawerParamList
>;

type Props = {
  navigation: AppDrawerNavigationProp & StackNavigationProp<RootStackParamList>;
};

type DrawerNavigation = DrawerNavigationProp<AppDrawerParamList>;

export default function AppDrawer ({ navigation}: Props) {


  const renderHeaderRight = (currentRoute: string | undefined) => {
    if (currentRoute !== 'Home') {
      return (
        <XStack
          marginRight='3%'
          marginTop='3%'
          gap={12}
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
          gap={12} >         
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
          onPress={() => signOut(navigation)}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: "#ff8a01",}} size={25}/>  
          </Button>
        </XStack>
        
        
      )
    }
    return null;
  };

        return (
          <Drawer.Navigator initialRouteName="HomeStack" screenOptions={{ 
            headerTransparent: true, 
            headerStyle: {
              height: 80},
            drawerStyle: {
              backgroundColor: 'transparent',
            },
            headerTintColor: "#ff8a01",
            // headerLeft: props =>
            //     <Button
            //     size="$2"
            //     height={40}
            //     variant="outlined"
            //     borderColor="#ff8a01" 
            //     onPress={() => navigation.toggleDrawer()}>
            //       <FontAwesomeIcon icon={faBars} style={{color: "#ff8a01",}} size={25}/>
            //     </Button>      
          }}
            drawerContent={(props) => <CustomDrawerContent {...props } />}>
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