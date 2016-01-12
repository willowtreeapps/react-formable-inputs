import React, { PropTypes } from 'react';
const always = (value) => () => value;

export default React.createClass({
    getInitialState() {
        return {
            debounceCallback: null
        };
    },
​
    propTypes: {
        async: PropTypes.func
    },
​
    getValue() {
        return this.refs.input.value;
    },
​
    validators: [],
​
    safeTrigger() {
        const callback = this.props[this.props.asyncEvent] || function(a) { return a; };
        callback();
        this.props.onChange();
    },
​
    runAsync(value) {
        this.validators = [];
​
        const result = this.props.async(this.getValue());
​
        if (!result || !result.then) return;
​
        return result.then(() => {
            if (value !== this.getValue()) return;
            this.validators = [];
            this.safeTrigger();
        }).catch((reason) => {
            if (value !== this.getValue()) return;
            this.validators = [];
            this.validators.push(always(reason));
            this.safeTrigger();
        });
    },
​
    debounce(value) {
​
        this.validators = [];
​
        if (this.state.debounceCallback) {
            clearTimeout(this.state.debounceCallback);
        }
​
        const debounceCallback = setTimeout(() => {
            this.runAsync(value);
        }, this.props.asyncTimeout);
        this.setState({ debounceCallback })
    },
​
    onValueUpdate() {
        this.setState({ lastChangedUnix: Date.now() });
        this.debounce(this.getValue());
        this.safeTrigger();
    },
​
    render() {
        const props = {
            [this.props.asyncEvent]: this.onValueUpdate,
        };
​
        return <input ref="input" {...this.props} {...props} />;
    }
});
