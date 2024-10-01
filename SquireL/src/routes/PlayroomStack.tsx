import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';

import PuzzleScreen from '../screens/PuzzleScreen/puzzleScreen';
import DrawingGameScreen from '../screens/DrawingGameScreen/DrawingGameScreen';
import PlayroomScreen from '../screens/PlayRoomScreen/PlayroomScreen';

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
              name="Puzzle" 
              component={ PuzzleScreen }
             
            />
            <Stack.Screen 
              name="DrawingGame" 
              component={ DrawingGameScreen }
              
            />
          </Stack.Navigator>
        );

}