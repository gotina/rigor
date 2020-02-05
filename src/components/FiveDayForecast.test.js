import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import FiveDayForecast from './FiveDayForecast';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("FiveDayForecast", () => {
    test("renders", () => {
        const wrapper = shallow(<FiveDayForecast />);

        expect(wrapper.exists()).toBe(true);
    })
});
