import { Text, StyleSheet, View } from 'react-native';

export default function PuzzleScreen() {

  return (    
      <View>
        <Text style={styles.title}>
            Puzzle Screen
        </Text>
      </View>

  );
}

const styles = StyleSheet.create({
    pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  title: {
    flex: 1
  }
});