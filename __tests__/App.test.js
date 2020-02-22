import "react-native"
import React from 'react'
import { shallow, mount } from 'enzyme'
import OTPInputView from '../index'

const setup = (props = {}) => {
    const wrapper = shallow(<OTPInputView {...props} />)
    return wrapper;
}

describe('OTPInputView renders correclty.', () => {
    let shallowWrapper;
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


