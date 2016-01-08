# react-formable-inputs

## Instructions

### Build

`npm run build`

### Dev

`npm start`

Then open localhost:8000 in a browser.


## Installation

**NPM**

    npm install react-formable-inputs --save

**Bower**

    bower install react-formable-inputs --save

## Docs

http://willowtreeapps.github.io/react-formable-inputs/

## Quickstart

We can include the library in several ways.

    // ES6 Imports
    import Form, { Input, Errors } from 'react-formable-inputs';

    // require
    var Formable = require('react-formable-inputs');
    var Form = Formable.Form;
    var Input = Formable.Input;
    var Errors = Formable.Errors;

    // require with de-structuring
    var { Form, Input, Errors } = require('react-formable-inputs');

Now let's render a simple login form that will display errors.

    const LoginForm = React.createClass({
        onSubmit(form) {
            console.log(form);
        },

        render() {
            return <Form onSubmit={this.onSubmit}>
                <Input name="username" type="text" />
                <Input name="password" type="password" />
                <button>Login</button>
                <Errors />
            </Form>;
        }
    });
