import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import PhoneVerificationView from 'react-native-otp-input';

export default class App extends React.Component {
  state = {
    code: "",
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{marginTop: 30}} onPress={() => { this.setState({code: ""})}}> 
          <Text>Resend</Text>
        </TouchableOpacity>

        <PhoneVerificationView
          style={{width: '80%', height: 200}}
          pinCount={4}
          code={this.state.code}
          // codeInputFieldStyle={styles.borderStyleBase}
          // codeInputHighlightStyle={styles.borderStyleHighLighted}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
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
