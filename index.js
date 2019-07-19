import React, { Component } from 'react'
import { View, TextInput, TouchableWithoutFeedback, Clipboard, Keyboard } from 'react-native'
import PropTypes from 'prop-types'
import styles from './styles'
import { isAutoFillSupported } from './helpers/device'

export default class OTPInputView extends Component {
    static propTypes = {
        pinCount: PropTypes.number,
        codeInputFieldStyle: PropTypes.object,
        codeInputHighlightStyle: PropTypes.object,
        onCodeFilled: PropTypes.func,
        autoFocusOnLoad: PropTypes.bool,
        code: PropTypes.string, 
    }

    static defaultProps = {
        pinCount: 6,
        codeInputFieldStyle: null,
        codeInputHighlightStyle: null,
        onCodeFilled: null,
        autoFocusOnLoad: true,
        code: "",
    }

    state = {
        digits: this.props.code.split("") || [],
        selectedIndex: 0,
    }

    fields = []

    componentDidMount() {
        const { code, autoFocusOnLoad } = this.props
        const focusIndex = code.length ? code.length - 1 : 0
        this.setState({
            digits: code.split(""),
        }, () => {
            if (focusIndex === 0 && autoFocusOnLoad) {
                this.focusField(focusIndex)
            }
        })
        this.checkPinCodeFromClipBoard()
        this._timer = setInterval(() => {
            this.checkPinCodeFromClipBoard()
        }, 400)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
    }

    componentWillUnmount() {
        if (this._timer) {
            clearInterval(this._timer)
        }
        this.keyboardDidHideListener.remove()
    }

    handleKeyboardDidHide = () => {
        this.blurAllFields() 
    }

    checkPinCodeFromClipBoard = () => {
        const { pinCount } = this.props
        Clipboard.getString().then(code => {
            if (this.hasCheckedClipBoard && code.length === pinCount && (this.clipBoardCode !== code)) {
                this.setState({
                    digits: code.split(""),
                }, () => {
                    this.blurAllFields()
                })
            }
            this.clipBoardCode = code
            this.hasCheckedClipBoard = true
        }).catch(e => {
        })
    }

    onChangeText = (index, text) => {
        const { onCodeFilled, pinCount } = this.props
        const { digits } = this.state
        let newdigits = digits.slice()

        const oldTextLength = newdigits[index] ? newdigits[index].length : 0
        const newTextLength = text.length
        if (newTextLength - oldTextLength === pinCount) { // user pasted text in.
            newdigits = text.split("").slice(oldTextLength, newTextLength)
            this.setState( {digits: newdigits })
        } else {
            if (text.length === 0) {
                if (newdigits.length > 0) {
                    newdigits = newdigits.slice(0, newdigits.length-1)
                }
            } else {
                text.split("").forEach((value) => {
                    newdigits[index] = value
                    index += 1
                })
                index -= 1
            }

            this.setState({ digits: newdigits })
        }

        let result = newdigits.join("")
        if (result.length >= pinCount) {
            onCodeFilled && onCodeFilled(result)
            this.focusField(pinCount - 1)
            this.blurAllFields()
        } else {
            if (text.length > 0 && index < pinCount - 1) {
                this.focusField(index + 1)
            }
        }
    }

    onKeyPressTextInput = (index, key) => {
        const { digits } = this.state
        if(key === 'Backspace') {
            if (!digits[index] && index > 0) {
                this.onChangeText(index - 1, '')
                this.focusField(index - 1)
            }
        }
    }

    focusField = (index) => {
        if (index < this.fields.length) {
            this.fields[index].focus()
            this.setState({
                selectedIndex: index
            })
        }
    }

    blurAllFields = () => {
        this.fields.forEach(field => field.blur())
        this.setState({
            selectedIndex: -1,
        })
    }

    renderOneInputField = ( _ , index ) => {
        const { codeInputFieldStyle, codeInputHighlightStyle } = this.props
        const { defaultTextFieldStyle } = styles
        const { selectedIndex, digits } = this.state
        return (
            <View pointerEvents="none" key={index + "view"}>
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    style={selectedIndex === index ? [defaultTextFieldStyle, codeInputFieldStyle, codeInputHighlightStyle] : [defaultTextFieldStyle, codeInputFieldStyle]}
                    ref={ref => { this.fields[index] = ref }}
                    onChangeText={text => {
                        this.onChangeText(index, text)
                    }}
                    onKeyPress={({ nativeEvent: { key } }) => { this.onKeyPressTextInput(index, key) }}
                    value={digits[index]}
                    keyboardType="number-pad"
                    textContentType= {isAutoFillSupported ? "oneTimeCode" : "none"}
                    key={index}
                    selectionColor="#00000000"
                />
            </View>
        )
    }

    renderTextFields = () => {
        const { pinCount } = this.props
        const array = new Array(pinCount).fill(0)
        return array.map(this.renderOneInputField)
    }

    render() {
        const { pinCount, style } = this.props
        const { digits } = this.state
        return (
            <View
                style={style}
            >
                <TouchableWithoutFeedback
                    style={{ width: '100%', height: '100%' }}
                    onPress={() => {
                        let filledPinCount = digits.filter((digit) => { return (digit !== null && digit !== undefined) }).length
                        this.focusField(Math.min(filledPinCount, pinCount - 1))
                    }}
                >
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', height: '100%' }}
                    >
                        {this.renderTextFields()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}