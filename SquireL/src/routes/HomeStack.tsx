import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MemoryScreen from '../screens/MemoryScreen/MemoryScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PlayroomStack from './PlayroomStack';
import type { HomeStackParamList } from '../types/navigationTypes';
import { Header } from '../components/Header';
import BackButton from '../components/BackButton';
import { Ionicons } from '@expo/vector-icons';
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
          headerBackImage: () => (
            <Ionicons
              name="chevron-back"
              size={3} // <- Increase this to make it bigger
              color="#FF8A01"
              style={{ marginLeft: 10 }}
            />
          ),
          headerTitle: () => null,
          headerRight: () => <Header navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Memory"
        component={MemoryScreen}
        options={({ navigation }) => ({
          title: 'Memory',
          headerTitle: () => null,
          headerRight: () => <Header navigation={navigation} />,
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
          headerRight: () => <Header navigation={navigation} />,
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <BackButton navigation={navigation} />
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="PlayroomStack"
        component={PlayroomStack}
        options={({ navigation }) => ({
          title: 'Playroom',
          headerTitle: () => null,
          headerRight: () => <Header navigation={navigation} />,
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
