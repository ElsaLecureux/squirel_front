import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Button } from 'react-native';

import PuzzleScreen from '../screens/PuzzleScreen/puzzleScreen';
import DrawingGameScreen from '../screens/DrawingGameScreen/DrawingGameScreen';
import PlayroomScreen from '../screens/PlayRoomScreen/PlayroomScreen';


const Stack = createNativeStackNavigator();

export default function PlayroomStack ({navigation}) {

        return (
          <Stack.Navigator initialRouteName="Playroom" screenOptions={{ headerShown: false }}>
            <Stack.Screen 
            name="Playroom" 
            component={ PlayroomScreen }
            options={{
              headerShown: false
            }}
            />
            <Stack.Screen 
              name="Puzzle" 
              component={ PuzzleScreen }
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen 
              name="DrawingGame" 
              component={ DrawingGameScreen }
              options={{
                headerShown: false
              }} 
            />
          </Stack.Navigator>
        );

}