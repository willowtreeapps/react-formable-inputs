import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import warning from 'warning';

/**

   Wraps any input component (either Formable components, or native DOM
   components) and returns a new component that follows Formable's API.

 */
const IdentityWrapper = React.createClass({

    displayName: 'IdentityWrapper',

    propTypes: {
        children: PropTypes.node
    },

    getDomValue(child) {
        if (!child.tagName || !child.type) {
            warning(false, `Components passed into ${this.constructor.displayName} must have a tagName and type associated with them`);
            return void 0;
        }

        const tagName = child.tagName.toLowerCase();
        const type = child.type.toLowerCase();

        if (tagName === 'input') {
            if (type === 'checkbox') return child.checked;
            if (type === 'radio') {
                return child.checked ? child.value : void 0;
            }
            return child.value;
        }

        if (tagName === 'select') {
            if (type === 'select-multiple') {
                const select = ReactDOM.findDOMNode(child);
                const options = Array.prototype.slice.call(select.options);

                return options.filter((option) => option.selected)
                              .map((option) => option.value);
            }
            return child.value;
        }

        if (tagName === 'textarea') {
            return child.value;
        }

        warning(false, `Unsupported component ${tagName} in ${this.constructor.displayName}`);
        return void 0;
    },

    /**
       Gets the values (that it can) from all child components. Does
       not do any filtering or anything fancy.

       @return {string|Array<string>} - String value, or array of
       strings (e.g. multiple select)
     */
    getValue() {
        const values = Object.keys(this.refs).map((refId) => {
            const child = this.refs[refId];

            return typeof child.getValue === 'function' ? child.getValue() :
                                                          this.getDomValue(child);
        }).filter((value) => typeof value !== 'undefined');

        warning(values.length <= 1, `${this.constructor.displayName} should only wrap one input type. Returning only the first valid value`);

        return values.length === 0 ? void 0 : values[0];
    },

    render() {
        const children = React.Children.map(this.props.children, (child, i) =>
            React.cloneElement(child, { ref: `input-${i}` }));

        return <span>{children}</span>;
    }
});

export default IdentityWrapper;
