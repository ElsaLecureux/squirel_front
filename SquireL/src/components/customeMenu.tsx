import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { YStack, Text, Image } from 'tamagui';
import { faHouse } from '@fortawesome/free-solid-svg-icons/faHouse';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import { faGamepad } from '@fortawesome/free-solid-svg-icons/faGamepad'; 
import signOut from '../constants/signOut';

const CustomDrawerContent = (props: any) => {
    
    return(

    <DrawerContentScrollView {...props}>
      <DrawerItem
          style={styles.drawerItem}
          label={() => (
            <YStack marginLeft="$2">
              <Image source={require('../assets/images/homeMenu.jpg')} style={styles.imageMenu}/>
            </YStack>
          )}
          onPress={() => props.navigation.navigate('HomeStack', { screen: 'Home' })}/>
         <DrawerItem
         style={styles.drawerItem}
          label={() => (
            <YStack marginLeft="$2">
              <Image source={require('../assets/images/playroomMenu.jpg')} style={styles.imageMenu}/>
            </YStack>
          )}
          onPress={() => props.navigation.navigate('PlayroomStack', { screen: 'PlayRoom' })}
        />
         <DrawerItem
         style={styles.drawerItem}
          label={() => (
            <YStack marginLeft="$2">
              <Text>Profile</Text>
            </YStack>
          )}
          icon={() => <FontAwesomeIcon icon={faGamepad} size={20} color="#ffa500" />}
          onPress={() => props.navigation.navigate('AppDrawer', { screen: 'Profile' })}
        />
        <DrawerItem
        style={styles.drawerItem}
          label={() => (
            <YStack marginLeft="$2">
              <Text>Log Out</Text>
            </YStack>
          )}
          icon={() => <FontAwesomeIcon icon={faArrowRightFromBracket} size={20} color="#ff6347" />}
          onPress={() => signOut(props.navigation)}
        />
    </DrawerContentScrollView>
    );
};


  const styles = StyleSheet.create({
    drawerItem: {
      height: 120,
      width: 120,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imageMenu:{
    height: 100,
      width: 100,
      borderRadius:50
    }
  });

  export default CustomDrawerContent;