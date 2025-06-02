import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
    navigation: StackNavigationProp<AppDrawerParamList> & StackNavigationProp<RootStackParamList>;
  };

 const signOut = async (navigation: any) => {

    if (Platform.OS === 'web'){
      localStorage.removeItem('access_token');
      if (!localStorage.getItem('access_token')){
          //message grace au error message pour dire au revoir
          navigation.reset({
            index: 0,
            routes: [{ name: 'Welcome' }],
          })
      }
      //message pour prevenir que log out failed
    }
    try {
      await SecureStore.deleteItemAsync('access_token'); 
      //message grace au error message pour dire au revoir   
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      })
    } catch (error) {
      // utiliser message error
     console.log('Something went wrong and log out failed');
    };
  }

  export default signOut;