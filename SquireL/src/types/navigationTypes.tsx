export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  HomeStack: { screen: keyof HomeStackParamList };
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
  PlayroomStack: { screen: keyof PlayroomStackParamList };
  Profile: undefined;
};
