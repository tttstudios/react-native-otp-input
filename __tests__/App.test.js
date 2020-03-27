import "react-native"
import React from 'react'
import { shallow, mount } from 'enzyme'
import OTPInputView from '../index'
import {TextInput} from "react-native"

const setup = (props = {}) => {
    const wrapper = shallow(<OTPInputView {...props} />)
    return wrapper
}

describe('OTPInputView renders correclty.', () => {
    let shallowWrapper
    it('OTP container view renders correctly.', () => {
        shallowWrapper = setup()
        const otpInputView = shallowWrapper.find({ testID: 'OTPInputView' })
        
        expect(otpInputView.length).toBe(1)
    })
    
    it('Render same amount of input slots as prop `pinCount`', () => {
        const pinCount = 6
        shallowWrapper = setup({ pinCount })
        const inputSlotViews = shallowWrapper.find({ testID: 'inputSlotView' })

        expect(inputSlotViews.length).toBe(pinCount)
    })

    it('Render the slots initial state as `code` prop.', () => {
        const code = '123456'
        const pinCount = code.length
        const reactWrapper = mount(<OTPInputView code={code} pinCount={pinCount} />)
        const textInputs = reactWrapper.find({ testID: 'textInput' }).hostNodes()
        const chars = code.split('')

        textInputs.map((textInput, index) => {
            expect(textInput.props().value).toBe(chars[index])
        })
    })
})

describe('Highlighted Slot Logic', () => {
    const pinCount = Math.floor(Math.random() * 50) + 1
    it('Input in slots to increase selectedIndex state.', () => {
        const reactWrapper = mount(<OTPInputView pinCount={pinCount} />)

        const componentInstance = reactWrapper.instance()
        componentInstance.handleChangeText(0, "1")

        expect(reactWrapper.state("selectedIndex")).toBe(1)
    })

    it('Stop increasing selectedIndex after inputting in the last slot.', () => {
        const numberCharEntered = Math.floor(Math.random() * 100) + pinCount

        const reactWrapper = mount(<OTPInputView pinCount={pinCount} />)

        const componentInstance = reactWrapper.instance()
        
        for(i=0; i < numberCharEntered; i++) {
            componentInstance.handleChangeText(i, "1")
        }

        expect(reactWrapper.state("selectedIndex")).toBeLessThanOrEqual(pinCount - 1)
    })
    it('Press backspace in keyboard to decrease selectedIndex state. ', () => {
        const numberCharEntered = Math.floor(Math.random() * (pinCount - 1)) + 1

        const reactWrapper = mount(<OTPInputView pinCount={pinCount} />)

        const componentInstance = reactWrapper.instance()
        
        for(i=0; i < numberCharEntered; i++) {
            componentInstance.handleChangeText(i, "1")
        }
        componentInstance.handleKeyPressTextInput(numberCharEntered, 'Backspace')

        expect(reactWrapper.state("selectedIndex")).toBe(numberCharEntered - 1)
    })
    it('Stop decreasing selectedIndex after deleting the text in the first slot.', () => {
        const reactWrapper = mount(<OTPInputView pinCount={pinCount} />)

        const componentInstance = reactWrapper.instance()
        componentInstance.handleKeyPressTextInput(0, 'Backspace')

        expect(reactWrapper.state("selectedIndex")).toBe(0)
    })
})

describe('Slot Content Change Logic', () => {
    const pinCount = Math.floor(Math.random() * 50) + 1
    it('handleChangeText is called with proper index and text param after making content change to a slot.', () => {
        const reactWrapper = mount(<OTPInputView pinCount={pinCount} />)
        const componentInstance = reactWrapper.instance()
        
        const textParam = "1"
        componentInstance.handleChangeText(0, textParam)

        reactWrapper.update()

        const textInput = reactWrapper.find(TextInput).at(0)
        expect(textInput.props().value).toBe(textParam)

    })

    it('Enter required digits of code triggers onCodeFilled callback method with code string.', () => {
        const onCodeFilled = jest.fn()

        let passCode = ""

        const reactWrapper = mount(<OTPInputView pinCount={pinCount} onCodeFilled={onCodeFilled} />)
        const componentInstance = reactWrapper.instance()
        for(i=0; i < pinCount; i++) {
            componentInstance.handleChangeText(i, "1")
            passCode += "1"
        }

        expect(onCodeFilled).toHaveBeenCalledWith(passCode)
    })

})

