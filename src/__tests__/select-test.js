jest.dontMock('../select');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Select = require('../select').default;

describe('Select', () => {
    it('renders with a className of errors', () => {
        let select, selectIndex;

        select = TestUtils.renderIntoDocument(<Select />);
        selectIndex = ReactDOM.findDOMNode(select).className.indexOf('select');
        expect(selectIndex).not.toBe(-1);
    });
});
