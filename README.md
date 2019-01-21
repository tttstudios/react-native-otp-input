![react-native-otp-input]
# react-native-otp-input

**react-native-otp-input** is a tiny JS library which provides an elegant UI for user to input one time passcode (OTP). It features robust checks to handle edge cases for the highly volatile user gestures. We provide default UI but you can customize the appearance as you like.

![demo.gif](https://github.com/Twotalltotems/react-native-otp-input/blob/master/example/demo.gif)

## Installation
`npm install --save react-native-otp-input`
or
`yarn add react-native-otp-input`

## Dependencies
It does not have dependencies.


## Basic Usage

```
import OTPInputView from 'react-native-otp-input'

<OTPInputView
  style={{width: '80%', height: 200}}
  pinCount={4}
  code={this.state.code}
  codeInputFieldStyle={styles.underlineStyleBase}
  codeInputHighlightStyle={styles.underlineStyleHighLighted}
  onCodeFilled = {(code => {
    alert(`Code is ${code}, you are good to go!`)
  })}
/>

const styles = StyleSheet.create({
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

```

## Parameters

| Parameter   | required | Description |
|-------------|----------|-------------|
| code        |    NO    |  The value to be passed to the component. Besides providing an initial value, changing this value will override the user input and reset the focus |
| pinCount    |    YES   |  Number of digits you want |
| codeInputFieldStyle | NO | The style of the input field which is NOT focused |
| codeInputHighlightStyle | NO | The style of the input field which is focused |
| onCodeFilled | NO | callback when the code is done |

## Notes
Although this library is an effort to make pin code input more efficient, it should be noted that the phone verification on mobile OS can be achieved without any text input. On iOS, it can be a single tap on a pin code which the operating system suggests. On Android, the system can validate the code without any user interaction (Automatic SMS Verification). The user input of pin code verification should be considered as the last resort.

This library already supports the pin code input suggestion on iOS, and it will be functional with React Native 0.58+. For Android, I would suggest to take a look at @Faizal's repo React-Native-OTP-Verify (https://github.com/faizalshap/react-native-otp-verify). It should be straight-forward to use this library along with @Faizal's library, in order to support automatic code verification on Android. 

## RoadMap
* [ ] Add some tests

## Developers
The library is developed by TTT stuido. TTT studio is a web and mobile development service provider, proudly operating in Canada. 

![ttt-logo.png](https://github.com/Twotalltotems/react-native-otp-input/blob/master/example/ttt-logo.png)