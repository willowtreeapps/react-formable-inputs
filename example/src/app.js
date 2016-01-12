import React from 'react';
import { render } from 'react-dom';

import { Select } from 'react-formable-inputs';

render(
    <Select name="colors" />,
    document.getElementById('app')
);
