type RootStackParamList = {
    Welcome: undefined;
    SignIn: undefined;
    SignUp: undefined;
    AppDrawer: undefined;
};

type AppDrawerParamList = {
    PlayroomStack: {screen: keyof PlayroomStackParamList};
    Profile: undefined;
    DrawingsBox: undefined;
    HomeStack: {screen: keyof HomeStackParamList};
}

type PlayroomStackParamList = {
    Playroom: undefined;
    Puzzle: undefined;
    DrawingGame: undefined;
    LookAndFind: undefined;
    Library: undefined;
};

type HomeStackParamList = {
    Home: undefined;
    Memory: undefined;
};