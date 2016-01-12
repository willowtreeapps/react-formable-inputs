import React, { PropTypes } from 'react';
import cx from 'classnames';
const identity = x => x;

export default React.createClass({
    propTypes: {
        type: PropTypes.string.isRequired,
        format: PropTypes.func,
        deformat: PropTypes.func,
        value: PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        defaultValue: PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        disabled: PropTypes.bool,
        fieldErrors: PropTypes.array,
        className: PropTypes.string,
        onChange: PropTypes.func
    },

    getDefaultProps() {
        return {
            fieldErrors: [],
            onChange: identity,
            format: identity,
            deformat: identity
        }
    },

    getInitialState() {
        return {
            value: this.props.deformat(this.props.value || this.props.defaultValue)
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.hasOwnProperty('value')) {
            this.setState({
                value: this.props.deformat(nextProps.value)
            });
        }
    },

    getValue() {
        return this.props.deformat(this.refs.input.value);
    },

    onChange(e) {
        if (this.props.disabled) return;

        this.setState({
            value: this.getValue()
        });

        this.props.onChange(e);
    },

    render() {
        const className = cx('input-container', this.props.className, {
            error: this.props.fieldErrors.length
        });

        return <input {...this.props}
                      value={this.props.format(this.state.value)}
                      onChange={this.onChange}
                      className={className}
                      ref="input" />;
    }
});
