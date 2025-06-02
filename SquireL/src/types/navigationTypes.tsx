export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  HomeStack: { screen: keyof HomeStackParamList };
  PlayroomStack: { screen: keyof PlayroomStackParamList };
};

export type PlayroomStackParamList = {
  Playroom: undefined;
  Kitchen: undefined;
  DrawingGame: undefined;
  LookAndFind: undefined;
  Library: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  Memory: undefined;
  Profile: undefined;
};
