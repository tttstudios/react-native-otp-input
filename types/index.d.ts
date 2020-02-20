// Type definitions for React Native OTP Input
// Project: https://github.com/Twotalltotems/react-native-otp-input
// Definitions by: Eric Dao
// Definitions: https://github.com/Twotalltotems/react-native-otp-input
// TypeScript Version: 3.7
//import * as React from 'react';

/**
 * Define types of keyboard
 * There are 4 main types:
 * default, email-address, number-pad and phone-pad
 */
export type KeyboardType = 'default' | 'email-address' | 'number-pad' | 'phone-pad';

/**
 *
 *
 * @interface InputProps
 */
export interface InputProps {
  /**
   * Number of Pins in the OTP
   */
  pinCount: number;
  /**
   * Style of the OTP
   */
  style?: object;
  /**
   * style of the inuput field
   */
  codeInputFieldStyle?: object;
  /**
   * Style of highlight for inputs
   */
  codeInputHighlightStyle?: object;
  /**
   * callback function
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
   *
   */
  autoFocusOnLoad?: boolean;
  /**
   * This variable store the code that has been entered
   */
  code?: string;
  /**
   *
   */
  secureTextEntry?: boolean;
  /**
   * Type of the keyboard
   * The type is KeyboardType
   */
  keyboardType?: KeyboardType;
  /**
   *
   */
  clearInputs?: boolean;
}

// export default class OTPInputView extends React.Component<InputProps> {
// }