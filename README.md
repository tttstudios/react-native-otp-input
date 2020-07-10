![PaginatableList](https://raw.githubusercontent.com/Twotalltotems/react-native-otp-input/master/assets/otp_banner.jpg)

# React Native OTP Input

![Tests](https://github.com/Twotalltotems/react-native-otp-input/workflows/Tests/badge.svg)

**@twotalltotems/react-native-otp-input** is a tiny Javascript library which provides an elegant UI for the end user to input one time passcode (OTP). It handles the input suggestion on iOS when the OTP SMS is received. For Android, it will autofill when the user presses the copy button on the SMS notification bar. It also features a carefully crafted flow to handle edge cases for volatile user gestures. We provide default UI, but you can always customize the appearance as you like.

![demo.gif](https://s3.ca-central-1.amazonaws.com/tttevents/iosvideo.gif)
![demo.gif](https://s3.ca-central-1.amazonaws.com/tttevents/android.gif)

## Installation

`npm install --save @twotalltotems/react-native-otp-input`
or
`yarn add @twotalltotems/react-native-otp-input`

## Dependencies

### NOTES: 
From version 1.3.10: We use @react-native-community/clipboard to handle the clipboard in this package, So you should install @react-native-community/clipboard

`npm install --save @react-native-community/clipboard`
or
`yarn add @react-native-community/clipboard`

## Basic Usage

```js
import OTPInputView from '@twotalltotems/react-native-otp-input'

...

<OTPInputView pinCount={4} />

```

## More Advanced Usage

```js
import OTPInputView from '@twotalltotems/react-native-otp-input'

...

<OTPInputView
    style={{width: '80%', height: 200}}
    pinCount={4}
    // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    // onCodeChanged = {code => { this.setState({code})}}
    autoFocusOnLoad
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

| Parameter               | required | Description                                                                                     |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| pinCount                | YES      | Number of digits in the component                                                               |
| code                    | NO       | You can use this library as a controlled / uncontrolled component by supplying this prop or not |
| codeInputFieldStyle     | NO       | The style of the input field which is NOT focused                                               |
| codeInputHighlightStyle | NO       | The style of the input field which is focused                                                   |
| autoFocusOnLoad         | NO       | Auto activate the input and bring up the keyboard when component is loaded                      |
| onCodeChanged           | NO       | Callback when the digits are changed                                                            |
| onCodeFilled            | NO       | Callback when the last digit is entered                                                         |
| secureTextEntry         | NO       | Hide contents of text fields                                                                    |
| editable                | NO       | Set editable for inputs                                                                         |
| keyboardAppearance      | NO       | Keyboard appearance ('default', 'dark', 'light')                                                |
| keyboardType            | NO       | Keyboard type                                                                                   |
| clearInputs             | NO       | Clear inputs after entering code                                                                |
| placeholderCharacter    | NO       | The character/string that will be used as placeholder in the individual code input fields       |
| placeholderTextColor    | NO       | Color of the placeholderCharacter                                                               |

## Notes

The iOS input suggestion requires React Native 0.58+ and works for iOS 12 and above.

On Android, it will be auto filled when you press the copy code button in the notification bar (see above GIF). It will do so only if the code is sent after the view is loaded. So make sure you request the code **AFTER** this view is loaded.

If you are interested in Android SMS Retriever API, we would suggest @Faizal's repo [React-Native-OTP-Verify](https://github.com/faizalshap/react-native-otp-verify). It looks pretty cool and it should be straight-forward to use React-Native-OTP-Verify along with this library.

## Roadmap

- [x] Typescript definition file
- [x] Typescript implementation
- [x] Add basic unit tests
- [ ] Add integration tests

## Contributors

<table>
    <tr border="0" style="border: none; ">
	      <th border="0" style="border-left: none; border-right: none;">
        	<img src="https://avatars1.githubusercontent.com/u/1243479?s=400&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/ansonyao">Anson Yao</a></sub> <br />
        </th>
        <th border="0" style="border-left: none; border-right: none;">
        <div>
        	<img src="https://avatars3.githubusercontent.com/u/16603120?s=460&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/BeckyWu220">Becky Wu</a></sub> <br />
        </div>
        </th>
        <th border="0" style="border-left: none; border-right: none;">
        	<img src="https://avatars3.githubusercontent.com/u/440097?s=460&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/fpena">Felipe Peña</a></sub> <br />
        </th>
        <th border="0" style="border-left: none; border-right: none;">
        	<img src="https://avatars3.githubusercontent.com/u/60905710?s=400&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/ericdao-ttt">Eric Dao</a></sub> <br />
        </th>
        <th border="0" style="border-left: none; border-right: none;">
        	<img src="https://avatars3.githubusercontent.com/u/3868329?s=460&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/VinsonLi">Vinson Li</a></sub> <br />
        </th>
        <th border="0" style="border-left: none; border-right: none;">
        	<img src="https://avatars0.githubusercontent.com/u/15810133?s=400&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/felixcck">Felix Cheng</a></sub> <br />
        </th>
        <th border="0" style="border-left: none; border-right: none;">
        	<img src="https://avatars3.githubusercontent.com/u/10748192?s=460&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/MitchellGanton">Mitchell Ganton</a></sub> <br />
        </th>
    </tr>
</table>

## External Contributors

<table>
    <tr border="0" style="border: none; ">
        <th border="0" style="border-left: none; border-right: none;">
        <div>
        	<img src="https://avatars2.githubusercontent.com/u/17710983?s=400&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/mikhailshvets">Mikhail.sh</a></sub> <br />
        </div>
        </th>
    </tr>
</table>

## Premium Support By TTT Studios

OTP input is presented by the mobile team at [TTT Studios](https://ttt.studio). We are a Digital Innovation Studio based out of Vancouver, Canada, delivering custom software and solutions that are designed and developed 100% in-house. The technologies we work with include AR & VR, IoT, AI, security & encryption, and cloud computing.

<div align="right">
	<img src="https://ttt.studio/wp-content/themes/tttwordpresstheme/imgs/ttt-colour.png" width="200px"/>
	<h5>Empowering Business Through Technology</h5>
</div>
