import React, { PropTypes } from 'react';
import JWSelect from 'react-select';
import classNames from 'classnames';
import identity from './helpers/identity';

export default class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        };
    }

    /**
     * Handle internal value change before continuing externally.
     *
     * @param {string} value the new value of the select
     * @return {undefined}
     */
    onChange(value) {
        value = (value === '') ? null : value;
        this.setState({ value: value }, () => {
            this.props.onChange(value);
        });
    }

    /**
     * Form interface method for getting the value of the input
     *
     * @return {(string|number)} the value of the select
     */
    getValue() {
        return this.state.value;
    }

    getClasses() {
        return classNames(
            'select-wrapper',
            {
                error: (this.props.fieldErrors || []).length,
                disabled: this.props.disabled,
                [`${this.props.className}`]: this.props.className
            }
        );
    }

    render() {
        return <div className={this.getClasses()}>
            <JWSelect {...this.props}
                onChange={this.onChange.bind(this)}
                value={this.state.value} />
        </div>
    }
}

Select.propTypes = {
    options: PropTypes.array,
    defaultValue: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ]),
    onChange: PropTypes.func,
    className: PropTypes.string,
    fieldErrors: PropTypes.array,
    disabled: PropTypes.bool
}

Select.defaultProps = {
    options: [],
    onChange: identity
}
