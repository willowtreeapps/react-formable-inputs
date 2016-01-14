jest.dontMock('../identityWrapper');

import React from 'react';
import TestUtils from 'react-addons-test-utils';

const IdentityWrapper = require('../identityWrapper').default;

describe('IdentityWrapper', () => {
    it('renders a basic text input', () => {
        const iden = TestUtils.renderIntoDocument(
            <IdentityWrapper>
                <input type="text" />
            </IdentityWrapper>
        );

        expect(iden.getValue()).toEqual('');

        let input = TestUtils.findRenderedDOMComponentWithTag(iden, 'input');

        input.value = 'basic';
        expect(iden.getValue()).toEqual('basic');
    });

    it('renders a basic textarea', () => {
        const iden = TestUtils.renderIntoDocument(
            <IdentityWrapper>
                <textarea />
            </IdentityWrapper>
        );

        expect(iden.getValue()).toEqual('');

        let textarea = TestUtils.findRenderedDOMComponentWithTag(iden, 'textarea');

        textarea.value = 'basic';
        expect(iden.getValue()).toEqual('basic');
    });

    it('renders a basic checkbox input', () => {
        const iden = TestUtils.renderIntoDocument(
            <IdentityWrapper>
                <input type="checkbox" />
            </IdentityWrapper>
        );

        expect(iden.getValue()).toEqual(false);

        let input = TestUtils.findRenderedDOMComponentWithTag(iden, 'input');

        input.checked = true;
        expect(iden.getValue()).toEqual(true);
    });

    it('renders basic radio inputs', () => {
        const iden = TestUtils.renderIntoDocument(
            <IdentityWrapper>
                <input type="radio"
                       name="pets" value="CAT" />
                <input type="radio"
                       name="pets" value="DOG" />
            </IdentityWrapper>
        );

        expect(iden.getValue()).toEqual(void 0);

        let inputs = TestUtils.scryRenderedDOMComponentsWithTag(iden, 'input');

        inputs[0].checked = true;
        expect(iden.getValue()).toEqual('CAT');

        inputs[1].checked = true;
        expect(iden.getValue()).toEqual('DOG');
    });

    it('renders basic select (select-one)', () => {
        const iden = TestUtils.renderIntoDocument(
            <IdentityWrapper>
                <select>
                    <option value="CAT">Cat</option>
                    <option value="DOG">Dog</option>
                </select>
            </IdentityWrapper>
        );

        // By default, selects the first option
        expect(iden.getValue()).toEqual('CAT');

        let select = TestUtils.findRenderedDOMComponentWithTag(iden, 'select');

        select.options[1].selected = true;
        expect(iden.getValue()).toEqual('DOG');
    });

    it('renders basic select (select-multiple)', () => {
        const iden = TestUtils.renderIntoDocument(
            <IdentityWrapper>
                <select multiple>
                    <option value="CAT">Cat</option>
                    <option value="DOG">Dog</option>
                </select>
            </IdentityWrapper>
        );

        expect(iden.getValue()).toEqual([]);

        let select = TestUtils.findRenderedDOMComponentWithTag(iden, 'select');

        select.options[0].selected = true;
        expect(iden.getValue()).toEqual(['CAT']);
        select.options[1].selected = true;
        expect(iden.getValue()).toEqual(['CAT', 'DOG']);
    });

    it('should handle components that supply their own `getValue()`', () => {
        const SomeInput = React.createClass({
            getValue: () => 'some-input-value',
            render: () => <span />
        });

        const iden = TestUtils.renderIntoDocument(
            <IdentityWrapper>
                <SomeInput />
            </IdentityWrapper>
        );

        expect(iden.getValue()).toEqual('some-input-value');
    });

    it('should return undefined on invalid components', () => {
        const iden = TestUtils.renderIntoDocument(
            <IdentityWrapper>
                <div>Invalid Component</div>
            </IdentityWrapper>
        );

        expect(iden.getValue()).toEqual(undefined);
    });
});
