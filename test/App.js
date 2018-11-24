import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PhoneVerificationView from './src/PhoneVerificationView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>

        <PhoneVerificationView
          style={{width: 300, height: 500}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
