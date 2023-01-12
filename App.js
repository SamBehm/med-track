import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import PillButton from './components/PillButton';
import React from 'react';

export default function App() {
  return (
    <View style={styles.container}>
      <PillButton style={styles.container} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  }
});



