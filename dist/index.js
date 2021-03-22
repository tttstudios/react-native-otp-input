import React, { Component } from 'react';
import { View, Clipboard, TextInput, TouchableWithoutFeedback, Keyboard, Platform, I18nManager, } from 'react-native';
import styles from './styles';
import { isAutoFillSupported } from './helpers/device';
import { codeToArray } from './helpers/codeToArray';
export default class OTPInputView extends Component {
    constructor(props) {
        super(props);
        this.fields = [];
        this.copyCodeFromClipBoardOnAndroid = () => {
            if (Platform.OS === "android") {
                this.checkPinCodeFromClipBoard();
                this.timer = setInterval(this.checkPinCodeFromClipBoard, 400);
            }
        };
        this.bringUpKeyBoardIfNeeded = () => {
            const { autoFocusOnLoad, pinCount } = this.props;
            const digits = this.getDigits();
            const focusIndex = digits.length ? digits.length - 1 : 0;
            if (focusIndex < pinCount && autoFocusOnLoad) {
                this.focusField(focusIndex);
            }
        };
        this.getDigits = () => {
            const { digits: innerDigits } = this.state;
            const { code } = this.props;
            return code === undefined ? innerDigits : code.split("");
        };
        this.handleKeyboardDidHide = () => {
            this.blurAllFields();
        };
        this.notifyCodeChanged = () => {
            const { digits } = this.state;
            const code = digits.join("");
            const { onCodeChanged } = this.props;
            if (onCodeChanged) {
                onCodeChanged(code);
            }
        };
        this.checkPinCodeFromClipBoard = () => {
            const { pinCount, onCodeFilled } = this.props;
            const regexp = new RegExp(`^\\d{${pinCount}}$`);
            Clipboard.getString().then(code => {
                if (this.hasCheckedClipBoard && regexp.test(code) && (this.clipBoardCode !== code)) {
                    this.setState({
                        digits: code.split(""),
                    }, () => {
                        this.blurAllFields();
                        this.notifyCodeChanged();
                        onCodeFilled && onCodeFilled(code);
                    });
                }
                this.clipBoardCode = code;
                this.hasCheckedClipBoard = true;
            }).catch(() => {
            });
        };
        this.handleChangeText = (index, text) => {
            const { onCodeFilled, pinCount } = this.props;
            const digits = this.getDigits();
            let newdigits = digits.slice();
            const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
            const newTextLength = text.length;
            if (newTextLength - oldTextLength === pinCount) { // user pasted text in.
                newdigits = text.split("").slice(oldTextLength, newTextLength);
                this.setState({ digits: newdigits }, this.notifyCodeChanged);
            }
            else {
                if (text.length === 0) {
                    if (newdigits.length > 0) {
                        newdigits = newdigits.slice(0, newdigits.length - 1);
                    }
                }
                else {
                    text.split("").forEach((value) => {
                        if (index < pinCount) {
                            newdigits[index] = value;
                            index += 1;
                        }
                    });
                    index -= 1;
                }
                this.setState({ digits: newdigits }, this.notifyCodeChanged);
            }
            let result = newdigits.join("");
            if (result.length >= pinCount) {
                onCodeFilled && onCodeFilled(result);
                this.focusField(pinCount - 1);
                this.blurAllFields();
            }
            else {
                if (text.length > 0 && index < pinCount - 1) {
                    this.focusField(index + 1);
                }
            }
        };
        this.handleKeyPressTextInput = (index, key) => {
            const digits = this.getDigits();
            if (key === 'Backspace') {
                if (!digits[index] && index > 0) {
                    this.handleChangeText(index - 1, '');
                    this.focusField(index - 1);
                }
            }
        };
        this.focusField = (index) => {
            if (index < this.fields.length) {
                this.fields[index].focus();
                this.setState({
                    selectedIndex: index
                });
            }
        };
        this.blurAllFields = () => {
            this.fields.forEach((field) => field.blur());
            this.setState({
                selectedIndex: -1,
            });
        };
        this.clearAllFields = () => {
            const { clearInputs, code } = this.props;
            if (clearInputs && code === "") {
                this.setState({ digits: [], selectedIndex: 0 });
            }
        };
        this.renderOneInputField = (_, index) => {
            const { codeInputFieldStyle, codeInputHighlightStyle, secureTextEntry, editable, keyboardType, selectionColor, keyboardAppearance } = this.props;
            const { defaultTextFieldStyle } = styles;
            const { selectedIndex, digits } = this.state;
            const { clearInputs, placeholderCharacter, placeholderTextColor } = this.props;
            const { color: defaultPlaceholderTextColor } = { ...defaultTextFieldStyle, ...codeInputFieldStyle };
            return (<View pointerEvents="none" key={index + "view"} testID="inputSlotView">
                <TextInput testID="textInput" underlineColorAndroid='rgba(0,0,0,0)' style={selectedIndex === index ? [defaultTextFieldStyle, codeInputFieldStyle, codeInputHighlightStyle] : [defaultTextFieldStyle, codeInputFieldStyle]} ref={ref => { this.fields[index] = ref; }} onChangeText={text => {
                this.handleChangeText(index, text);
            }} onKeyPress={({ nativeEvent: { key } }) => { this.handleKeyPressTextInput(index, key); }} value={!clearInputs ? digits[index] : ""} keyboardAppearance={keyboardAppearance} keyboardType={keyboardType} textContentType={isAutoFillSupported ? "oneTimeCode" : "none"} key={index} selectionColor={selectionColor} secureTextEntry={secureTextEntry} editable={editable} placeholder={placeholderCharacter} placeholderTextColor={placeholderTextColor || defaultPlaceholderTextColor}/>
            </View>);
        };
        this.renderTextFields = () => {
            const { pinCount } = this.props;
            const array = new Array(pinCount).fill(0);
            return array.map(this.renderOneInputField);
        };
        const { code } = props;
        this.state = {
            digits: codeToArray(code),
            selectedIndex: props.autoFocusOnLoad ? 0 : -1,
        };
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { code } = this.props;
        if (nextProps.code !== code) {
            this.setState({ digits: codeToArray(nextProps.code) });
        }
    }
    componentDidMount() {
        this.copyCodeFromClipBoardOnAndroid();
        this.bringUpKeyBoardIfNeeded();
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
    }
    componentWillUnmount() {
        var _a;
        if (this.timer) {
            clearInterval(this.timer);
        }
        (_a = this.keyboardDidHideListener) === null || _a === void 0 ? void 0 : _a.remove();
    }
    render() {
        const { pinCount, style, clearInputs } = this.props;
        const digits = this.getDigits();
        return (<View testID="OTPInputView" style={style}>
                <TouchableWithoutFeedback style={{ width: '100%', height: '100%' }} onPress={() => {
            if (!clearInputs) {
                let filledPinCount = digits.filter((digit) => { return (digit !== null && digit !== undefined); }).length;
                this.focusField(Math.min(filledPinCount, pinCount - 1));
            }
            else {
                this.clearAllFields();
                this.focusField(0);
            }
        }}>
                    <View style={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}>
                        {this.renderTextFields()}
                    </View>
                </TouchableWithoutFeedback>
            </View>);
    }
}
OTPInputView.defaultProps = {
    pinCount: 6,
    autoFocusOnLoad: true,
    secureTextEntry: false,
    editable: true,
    keyboardAppearance: "default",
    keyboardType: "number-pad",
    clearInputs: false,
    placeholderCharacter: "",
    selectionColor: '#000',
};
//# sourceMappingURL=index.js.map