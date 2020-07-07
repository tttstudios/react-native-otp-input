/* typescript declaration file created for @twotalltotems/react-native-otp-input
 * created by: Eric Dao, Becky Wu from TTTStudios
 */


declare module '@twotalltotems/react-native-otp-input' {
  import * as React from 'react'
  import { TextStyle, ViewStyle } from 'react-native';

  /**
   * Define types of keyboard
   * There are 4 main types:
   * default, email-address, number-pad and phone-pad
   */
  type KeyboardType = 'default' | 'email-address' | 'number-pad' | 'phone-pad';

  export interface InputProps {
    /**
     * Digits of pins in the OTP
     */
    pinCount: number;
    /**
     * Style of the input fields
     */
    codeInputFieldStyle?: TextStyle;
    /**
     * Style of highlighted status for input fields
     */
    codeInputHighlightStyle?: TextStyle;
    /**
     * Callback function
     * Trigger when all fields of the OTP has been filled
     *
     * @param code The verification code
     */
    onCodeFilled?: (code: string) => void;
    /**
     * Callback function
     * Trigger when a field of the OTP is changed
     *
     * @param code The verification code
     */
    onCodeChanged?: (code: string) => void;
    /**
     * If keyboard is automatically brought up when OTP is loaded.
     */
    autoFocusOnLoad?: boolean;
    /**
     * Initial pin code
     */
    code?: string;
    /**
     * Secure input text
     */
    secureTextEntry?: boolean;
    /**
     * Set editable for inputs
     */
    editable?: boolean;
    /**
     * Type of the keyboard
     */
    keyboardType?: KeyboardType;
    /**
     * Placeholder character to fill all inputs when the OTP is empty
     */
    placeholderCharacter?: string;
    /**
     * Placeholder text color of inputs
     */
    placeholderTextColor?: string;
    /**
     * Style of the OTP container view
     */
    style?: ViewStyle;
    /**
     * The highlight (and cursor on iOS) color of the text input.
     */
    selectionColor?: string;
    /**
     * If inputs are automatically cleared.
     */
    clearInputs?: boolean;

    /**
     * Keyboard appearance. The value can be 'default', 'dark' or 'light'.
     */
    keyboardAppearance?: 'default' | 'dark' | 'light';
  }

  export interface OTPInputViewState {
      digits: string[];
      selectedIndex: number;
  }

  export default class OTPInputView extends React.Component<InputProps, OTPInputViewState> {

  }
}

