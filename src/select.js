import React, { PropTypes } from 'react';
import JWSelect from 'react-select';
import classNames from 'classnames';

export default class Select extends React.Component {

    render() {
        const classes = classNames(
            'select-wrapper',
            {
                error: this.props.errors.length,
                disabled: this.props.disabled,
                [`${this.props.className}`]: this.props.className
            }
        );

        return <div className={classes}>
            <JWSelect {...this.props} />
        </div>
    }
}

Select.propTypes = {
    options: PropTypes.array,
    errors: PropTypes.array,
    className: PropTypes.string,
    disabled: PropTypes.bool
}

Select.defaultProps = {
    options: [],
    errors: []
}
