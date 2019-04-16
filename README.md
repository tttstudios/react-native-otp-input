![react-native-otp-input]
# react-native-otp-input

**react-native-otp-input** is a tiny JS library which provides an elegant UI for user to input one time passcode (OTP). It handles and the input suggestion on iOS when the OTP SMS is received. For Android, it will autofill when you press the copy button on the SMS notification bar. It also features a carefully crafted flow to handle edge cases for volatile user gestures. We provide default UI but you can always customize the appearance as you like.

![demo.gif](https://github.com/ansonyao/react-native-opt-input-anson/blob/master/example/Assets/android.gif)
![demo.gif](https://github.com/ansonyao/react-native-opt-input-anson/blob/master/example/Assets/iosvideo.gif)

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
    code=""
    // codeInputFieldStyle={styles.borderStyleBase}
    // codeInputHighlightStyle={styles.borderStyleHighLighted}
    codeInputFieldStyle={styles.underlineStyleBase}
    codeInputHighlightStyle={styles.underlineStyleHighLighted}
    onCodeFilled = {(code => {
        console.log(`Code is ${code}, you are good to go!`)
    })}
/>

const styles = StyleSheet.create({
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

```

## Parameters

| Parameter   | required | Description |
|-------------|----------|-------------|
| pinCount    |    YES   |  Number of digits you want |
| code        |    NO    |  Besides providing an initial value, you can also give this value using state or props. It will override the user input and reset the focus. For example, you can use it to hook up with the Android SMS Retriever API. |
| codeInputFieldStyle | NO | The style of the input field which is NOT focused |
| codeInputHighlightStyle | NO | The style of the input field which is focused |
| onCodeFilled | NO | callback when the code is done |

## Notes
The iOS input suggestion requires React Native 0.58+. 

On Android, it will be autofilled when you press the copy code button in the notification bar (see above gif). It will only do so for the code which is sent after the view is created. So make sure you request the code AFTER this view is rendered.

If you are interested in Android SMS Retriever API, I would suggest @Faizal's repo React-Native-OTP-Verify (https://github.com/faizalshap/react-native-otp-verify). It looks pretty good and it should be straight-forward to use this library along with @Faizal's library.

## RoadMap
* [ ] Add some tests

## Developers
The app is developed by Anson Yao, Felipe Pena and other mobile team members in TTT stuidio.
![TTT studio](https://ttt.studio/) is a software developement company operating in Vancouver. We craft software in mobile, web, backend, facial recognition, AI, AR/VR. 

![ttt-logo.png](https://ttt.studio/wp-content/themes/tttwordpresstheme/imgs/ttt-colour.png)