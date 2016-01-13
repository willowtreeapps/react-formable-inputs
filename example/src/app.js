import React from 'react';
import { render } from 'react-dom';

import { Select } from 'react-formable-inputs';

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

render(
    <Select options={options} value="one" />,
    document.getElementById('app')
);
