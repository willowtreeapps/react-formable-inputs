jest.dontMock('../select');
jest.dontMock('classnames');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const Select = require('../select').default;

describe('Select', () => {
    const options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
        { value: 'three', label: 'Three' }
    ];

    it('can receive a default value', () => {
        const select = TestUtils.renderIntoDocument(<Select options={options} defaultValue={'two'} />);

        expect(select.getValue()).toBe('two');
    });

    it('does not set value when none is present', () => {
        const select = TestUtils.renderIntoDocument(<Select options={options} />);

        expect(select.getValue()).toBe(undefined);
    });

    it('can be asked for its value by owning form', () => {
        const select = TestUtils.renderIntoDocument(<Select options={options} defaultValue={'two'} />);

        expect(select.getValue()).toBe('two');
    });

    it('renders with default classname', () => {
        let select, selectDom;

        select = TestUtils.renderIntoDocument(<Select />);
        selectDom = ReactDOM.findDOMNode(select);
        expect(selectDom.className.indexOf('select-wrapper')).not.toBe(-1);
    });

    it('can be disabled', () => {
        let select, selectDom;

        select = TestUtils.renderIntoDocument(<Select />);
        selectDom = ReactDOM.findDOMNode(select);
        expect(selectDom.className.indexOf('disabled')).toBe(-1);

        select = TestUtils.renderIntoDocument(<Select disabled={true} />);
        selectDom = ReactDOM.findDOMNode(select);
        expect(selectDom.className.indexOf('disabled')).not.toBe(-1);
    });

    it('can be given a specific classname', () => {
        let select, selectDom;

        select = TestUtils.renderIntoDocument(<Select className={'awesome'} />);
        selectDom = ReactDOM.findDOMNode(select);
        expect(selectDom.className.indexOf('awesome')).not.toBe(-1);
    });

    it('can display error class errors', () => {
        let select, selectDom;

        select = TestUtils.renderIntoDocument(<Select />);
        selectDom = ReactDOM.findDOMNode(select);
        expect(selectDom.className.indexOf('error')).toBe(-1);

        select = TestUtils.renderIntoDocument(<Select fieldErrors={['not awesome']} />);
        selectDom = ReactDOM.findDOMNode(select);
        expect(selectDom.className.indexOf('error')).not.toBe(-1);
    });

    it('propogates value change externally', () => {
        let select;
        const onChangeMock = jest.genMockFn();

        select = TestUtils.renderIntoDocument(<Select onChange={onChangeMock} options={options} />);
        select.onChange('December');
        expect(onChangeMock).toBeCalledWith('December');
    });
});
