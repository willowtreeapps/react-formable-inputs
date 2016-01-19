import React from 'react';
import { render } from 'react-dom';

import { Select, Textarea } from 'react-formable-inputs';

const options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];

function getStuff() {
    return <div>
            <Select options={options} defaultValue="one" />
            <hr />
            <Textarea defaultValue="default value"/>
        </div>;
}

render(
    getStuff(),
    document.getElementById('app')
);
