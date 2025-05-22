import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

import DrawingGameScreen from '../screens/DrawingGameScreen/DrawingGameScreen';
import PlayroomScreen from '../screens/PlayRoomScreen/PlayroomScreen';
import LookAndFindScreen from '../screens/LookAndFindScreen/LookAndFindScreen';
import LibraryScreen from '../screens/LibraryScreen/LibraryScreen';
import KitchenScreen from '../screens/KitchenScreen/KitchenScreen';

const Stack = createNativeStackNavigator<PlayroomStackParamList>();

type PlayroomStackNavigationProp = StackNavigationProp<
  PlayroomStackParamList 
>;

type Props = {
  navigation: PlayroomStackNavigationProp;
};

export default function PlayroomStack ({navigation}: Props) {

        return (
          <Stack.Navigator initialRouteName="Playroom" screenOptions={{ headerShown: false }}>
            <Stack.Screen 
            name="Playroom" 
            component={ PlayroomScreen }
            
            />
            <Stack.Screen 
              name="Kitchen" 
              component={ KitchenScreen }
             
            />
            <Stack.Screen 
              name="DrawingGame" 
              component={ DrawingGameScreen }
              
            />
            <Stack.Screen 
              name="LookAndFind" 
              component={ LookAndFindScreen }
              
            />
            <Stack.Screen 
              name="Library" 
              component={ LibraryScreen }
              
            />
          </Stack.Navigator>
        );

}