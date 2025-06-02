import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MemoryScreen from '../screens/MemoryScreen/MemoryScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import type { HomeStackParamList } from '../types/navigationTypes';
import { ProfileButton } from '../components/ProfileButton';
import BackButton from '../components/BackButton';
import { View } from 'tamagui';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTransparent: true,
        headerTintColor: '#ff8a01',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: 'Home',
          headerTitle: () => null,
          headerRight: () => <ProfileButton navigation={navigation} />,
          headerLeft: () => null,
        })}
      />
      <Stack.Screen
        name="Memory"
        component={MemoryScreen}
        options={({ navigation }) => ({
          title: 'Memory',
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
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'Profile',
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
