import React, { Component } from 'react';
import { View, Dimensions, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

export default class PhoneVerificationView extends Component {
    static propTypes = {
        pinCount: PropTypes.number

    }

    static defaultProps = {
        pinCount: 6
    }

    state = {
        codes: [],
    }

    fields = []

    componentDidMount() {
        this.fields[0].focus && this.fields[0].focus()
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {this._renderTextFields()}
            </View>
        );
    }

    _renderOneInputField = (index) => {
        let textFieldStyle = {width : 45, height : 45, borderColor : 'rgba(226, 226, 226, 1)', borderWidth : 1, borderRadius : 2, textAlign : 'center'}


        return (
            <TextInput
                underlineColorAndroid='rgba(0,0,0,0)'
                style={textFieldStyle}
                ref={ref => { this.fields[index] = ref }}
                onChangeText={text => {
                    this._onChangeText(index, text)
                }}
                onKeyPress={({ nativeEvent: { key } }) => { this._onKeyPress(index, key) }}
                value={this.state.codes[index]}
                keyboardType="number-pad"
                key={index}
            />
        )
    }

    _renderTextFields = () => {
        let array = new Array()
        for (i = 0; i<this.props.pinCount; i++) {
            array[i] = i
        }
        return array.map(this._renderOneInputField)
    }


    _onChangeText = (index, text) => {
        if (index === this.props.pinCount - 1 && text.length > 1) { return }
        const newCodes = this.state.codes.slice()
        newCodes[index] = text
        this.setState({codes: newCodes})
        if (text.length > 0 && index < this.props.pinCount - 1) {
            this._focusField(index + 1)
        } 
    }

    _onKeyPress = (index, key) => {
        if(key === 'Backspace' && this.state.codes[index] === '' && index > 0) {
            this._onChangeText(index - 1, '')
            this._focusField(index - 1)
        }   
    }

    _focusField = (index) => {
        this.fields[index].focus()
    }
}