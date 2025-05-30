import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayroomScreen from '../screens/PlayRoomScreen/PlayroomScreen';

import LibraryScreen from '../screens/LibraryScreen/LibraryScreen';
import KitchenScreen from '../screens/KitchenScreen/KitchenScreen';
import { PlayroomStackParamList } from '../types/navigationTypes';

const Stack = createNativeStackNavigator<PlayroomStackParamList>();

export default function PlayroomStack() {
  return (
    <Stack.Navigator initialRouteName="Playroom" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Playroom" component={PlayroomScreen} />
      <Stack.Screen name="Kitchen" component={KitchenScreen} />
      <Stack.Screen name="Library" component={LibraryScreen} />
    </Stack.Navigator>
  );
}
