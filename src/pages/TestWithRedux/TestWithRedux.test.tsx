import React from 'react';
import { mount } from 'enzyme';
import { TestWithRedux } from './TestWithRedux';
	
describe('TestWithRedux without Redux', () => {
	it('should render', () => {
		const wrapper = mount(<TestWithRedux text="test"/>);
		expect(wrapper.type()).toEqual(TestWithRedux);
	});
});
