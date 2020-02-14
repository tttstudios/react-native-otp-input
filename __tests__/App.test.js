import "react-native"
import React from 'react'
import { shallow } from 'enzyme'
import OTPInputView from '../index'

const setup = (props = {}) => {
    const wrapper = shallow(<OTPInputView {...props} />)
    return wrapper;
}

describe('OTPInputView renders correclty.', () => {
    let wrapper;
    it('OTP container view renders correctly.', () => {
        wrapper = setup()
        const otpInputView = wrapper.find({ testID: 'OTPInputView' })
        expect(otpInputView.length).toBe(1)
    })
    
    it('Render same amount of input slots as prop `pinCount`', () => {
        const pinCount = 6
        wrapper = setup({ pinCount })
        const inputSlotViews = wrapper.find({ testID: 'inputSlotView' })
        expect(inputSlotViews.length).toBe(pinCount)
    })
})