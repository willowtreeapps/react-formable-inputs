import React, { PropTypes } from 'react';
import JWSelect from 'react-select';

export default class Select extends React.Component {

    displayName: 'Select'

    renderOption(option) {
        return <option value="xx">Value X</option>
    }

    render() {
        return <select className="select" options={[]}>
            {this.props.options.map(option => {
                this.renderOption(option);
            })};
        </select>;
    }
}

Select.propTypes = {
    options: PropTypes.array
}

Select.defaultProps = {
    options: []
}
