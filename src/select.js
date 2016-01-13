import React, { PropTypes } from 'react';
import JWSelect from 'react-select';
import classNames from 'classnames';
import identity from './helpers/identity';

export default class Select extends React.Component {

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

    getClasses() {
        return classNames(
            'select-wrapper',
            {
                error: this.props.errors.length,
                disabled: this.props.disabled,
                [`${this.props.className}`]: this.props.className
            }
        );
    }

    render() {
        return <div className={this.getClasses()}>
            <JWSelect {...this.props}
                onChange={this.onChange.bind(this)} />
        </div>
    }
}

Select.propTypes = {
    options: PropTypes.array,
    errors: PropTypes.array,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
}

Select.defaultProps = {
    options: [],
    errors: [],
    onChange: identity
}
