// Type definitions for React Native OTP Input
// Project: https://github.com/Twotalltotems/react-native-otp-input
// Definitions by: Eric Dao
// Definitions: https://github.com/Twotalltotems/react-native-otp-input
// TypeScript Version: 3.7
import * as React from 'react';

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

export interface InputState {
  /**
   * Array that save all character of the input code
   * use for indicate charaters in the fields
   */
  digits?: Array<string>;
  /**
   * Index of the current selected field
   */
  selectedIndex: number;
}
/**
 * Timer for checking copy code from clipBoard on Android devices
 */
export var _timer: number;
/**
 * The code from clip board
 */
export var clipBoardCode: string;
/**
 * Variable indicates that the clipboard has been checked or not
 */
export var hasCheckedClipBoard: boolean;

/**
 * This function automatically call checkPinCodeFromClipBoard every 400ms
 *
 */
export function copyCodeFromClipBoardOnAndroid(): void;
/**
 * Check should display keyboard
 *
 */
export function bringUpKeyBoardIfNeeded(): void;
/**
 * Get the code String in state
 *
 * @returns {Array<string>} array of string split from code
 */
export function getDigits(): Array<string>;
/**
 * When keyboard is hide, blur all fields
 *
 */
export function handleKeyboardDidHide(): void;
/**
 * Notify when the code changed
 * Trigger function onCodeChanged
 *
 */
export function notifyCodeChanged(): void;
/**
 * Check the code in clipboard
 * Set value to digits variable in the state
 *
 */
export function checkPinCodeFromClipBoard(): void;
/**
 * This function handle a charater entered
 *
 * Set new value for digits in the state
 *
 * @param {number} index
 * @param {string} text
 */
export function handleChangeText(index: number, text: string): void;
/**
 *
 *
 * @param {number} index
 * @param {string} text
 */
export function handleKeyPressTextInput(index: number, text: string): void;
/**
 * Focus on a field with the index
 *
 * @param {number} index
 */
export function focusField(index: number): void;
/**
 * Blur all fields of the Input
 *
 */
export function blurAllFields(): void;
/**
 * Clear all fields of the Input
 *
 */
export function clearAllFields(): void;
/**
 * Display a field of Input
 *
 * @param {*} _
 * @param {number} index
 * @returns {*} View for a Input Field
 */
export function renderOneInputField(_: any, index: number): any;
/**
 * Display all fields of
 *
 * @returns {*}
 */
export function renderTextFields(): any;

export default class OTPInputView extends React.Component<InputProps, InputState> {
  pinCount: number;
}

// declare namespace Helpers {
//   /**
//    * Indicates that is auto-fill supported on the device
//    */
//   export var isAutoFillSupported: boolean;
// }
