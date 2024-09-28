import { View, StyleSheet, Text } from 'react-native';

export default function DrawingGameScreen() {

  return (    
      <View style={styles.pageContainer}>
        <Text style={styles.title}>
            Drawings Box
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