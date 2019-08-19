/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import OTPInputView from '@twotalltotems/react-native-otp-input'

export default class App extends React.Component {
  state = {
    code: ""
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop: 30}} onPress={() => { this.setState({code: ""})}}> 
          <Text>Resend</Text>
        </TouchableOpacity>

        <OTPInputView
          style={{width: '80%', height: 200}}
          pinCount={4}
          code={this.state.code}
          onCodeChanged = {code => { this.setState({code})}}          
          autoFocusOnLoad={true}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled = {(code => {
              console.log(`Code is ${code}, you are good to go!`)
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
