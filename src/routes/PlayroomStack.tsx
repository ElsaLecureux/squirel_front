import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayroomScreen from '../screens/PlayRoomScreen/PlayroomScreen';

import LibraryScreen from '../screens/LibraryScreen/LibraryScreen';
import KitchenScreen from '../screens/KitchenScreen/KitchenScreen';
import { PlayroomStackParamList } from '../types/navigationTypes';
import { ProfileButton } from '../components/ProfileButton';
import BackButton from '../components/BackButton';
import { View } from 'tamagui';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<PlayroomStackParamList>();

export default function PlayroomStack() {
  return (
    <Stack.Navigator
      initialRouteName="Playroom"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#ff8a01',
      }}
    >
      <Stack.Screen
        name="Playroom"
        component={PlayroomScreen}
        options={({ navigation }) => ({
          title: 'Playroom',
          headerTitle: () => null,
          headerRight: () => <ProfileButton navigation={navigation} />,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <BackButton navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Kitchen"
        component={KitchenScreen}
        options={({ navigation }) => ({
          title: 'Kitchen',
          headerTitle: () => null,
          headerRight: () => <ProfileButton navigation={navigation} />,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <BackButton navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Library"
        component={LibraryScreen}
        options={({ navigation }) => ({
          title: 'Library',
          headerTitle: () => null,
          headerRight: () => <ProfileButton navigation={navigation} />,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <BackButton navigation={navigation} />
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    paddingLeft: 40,
    paddingTop: 40,
  },
});
