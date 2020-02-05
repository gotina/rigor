import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import CurrentWeather from './CurrentWeather';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("CurrentWeather", () => {
    test("renders", () => {
        const wrapper = shallow(<CurrentWeather />);

        expect(wrapper.exists()).toBe(true);
    })
});
