import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import HomeStack from './HomeStack';
import type { RootStackParamList } from '../types/navigationTypes';
import PlayroomStack from './PlayroomStack';
import { useUser } from '../context/UserContext';
import LoadingScreen from '../components/LoadingScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStack() {
  const { isSignedIn, isLoading } = useUser();

  if (isLoading) {
    return <LoadingScreen></LoadingScreen>;
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Welcome'}>
      {isSignedIn ? (
        <>
          <Stack.Screen name="HomeStack" component={HomeStack} />
          <Stack.Screen name="PlayroomStack" component={PlayroomStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
