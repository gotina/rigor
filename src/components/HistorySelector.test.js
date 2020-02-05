import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import HistorySelector from './HistorySelector';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("HistorySelector", () => {
    test("renders", () => {
        const wrapper = shallow(<HistorySelector />);

        expect(wrapper.exists()).toBe(true);
    })
});
