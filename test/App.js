import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import PhoneVerificationView from './src/PhoneVerificationView';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>

        <PhoneVerificationView
          style={{width: '80%', height: 200}}
          pinCount={4}
          code=""
          codeInputFieldStyle={styles.borderStyleBase}
          codeInputHighlightStyle={styles.borderStyleHighLighted}
          // codeInputFieldStyle={styles.underlineStyleBase}
          // codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled = {(code => {
            alert(`Code is ${code}, you are good to go!`)
          })}
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

  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
