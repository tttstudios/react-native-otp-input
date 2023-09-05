/// <reference path="../index.d.ts" />
import { InputProps, OTPInputViewState } from '@twotalltotems/react-native-otp-input';
import { Component } from 'react';
import { TextInput } from 'react-native';
export default class OTPInputView extends Component<InputProps, OTPInputViewState> {
    static defaultProps: InputProps;
    private fields;
    private keyboardDidHideListener?;
    private timer?;
    private hasCheckedClipBoard?;
    private clipBoardCode?;
    constructor(props: InputProps);
    UNSAFE_componentWillReceiveProps(nextProps: InputProps): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    private copyCodeFromClipBoardOnAndroid;
    bringUpKeyBoardIfNeeded: () => void;
    getDigits: () => string[];
    private handleKeyboardDidHide;
    private notifyCodeChanged;
    checkPinCodeFromClipBoard: () => void;
    private handleChangeText;
    private handleKeyPressTextInput;
    focusField: (index: number) => void;
    blurAllFields: () => void;
    clearAllFields: () => void;
    renderOneInputField: (_: TextInput, index: number) => JSX.Element;
    renderTextFields: () => JSX.Element[];
    render(): JSX.Element;
}
