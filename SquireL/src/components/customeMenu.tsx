import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { YStack, Text, Image } from 'tamagui';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad'; 
import signout from '../constants/signOut';
import { useUser } from "../context/UserContext";

const CustomDrawerContent = (props: any) => {
    
    const { signOut } = useUser();

    return(

    <DrawerContentScrollView {...props}>
      <DrawerItem
        style={styles.drawerItem}
        label={() => (
          <YStack>
            <Image source={require('../assets/images/homeMenu.jpg')} style={styles.imageMenu}/>
          </YStack>
          )}
          onPress={() => props.navigation.navigate('HomeStack', { screen: 'Home' })}/>
      <DrawerItem
        style={styles.drawerItem}
        label={() => (
          <YStack>
            <Image source={require('../assets/images/playroomMenu.jpg')} style={styles.imageMenu}/>
          </YStack>
          )}
          onPress={() => props.navigation.navigate('PlayroomStack', { screen: 'PlayRoom' })}/>
      <DrawerItem
        style={styles.drawerItem}
        label={() => (
          <YStack>
            <Image source={require('../assets/images/profileMenu.jpg')} style={styles.imageMenu}/>
          </YStack>
          )}
        onPress={() => props.navigation.navigate('AppDrawer', { screen: 'Profile' })} />
      <DrawerItem
        style={styles.drawerItem}
        label={() => (
          <YStack style= {styles.iconContainer}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} size={35} color="#ff6347"/>
          </YStack>
          )}
        onPress={() => [signout(props.navigation),  signOut()]}
        />
    </DrawerContentScrollView>
    );
};


  const styles = StyleSheet.create({
    drawerItem: {
      height: 120,
      width: 200,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageMenu:{
    height: 100,
      width: 100,
      borderRadius:50
    },
    iconContainer:{
      height: 100,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  export default CustomDrawerContent;