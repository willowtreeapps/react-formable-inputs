import React from 'react';
import { render } from 'react-dom';
import { Input, Test } from 'react-formable-inputs';
import Form from 'react-formable';

const App = React.createClass({
    render() {
        return <Form onChange={e => window.console.log(e)}>
            <Test  type="number">
                <Input name="kevin" type="text" />
            </Test>
        </Form>;
    }
});

render(
    <App />,
    document.getElementById('app')
);
