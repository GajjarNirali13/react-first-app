import React from 'react';

import '../App.css';
import { FormErrors } from './FormErrors';
import { Main } from './Main';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            formErrors: { email: '', password: '' },
            emailValid: false,
            passwordValid: false,
            formValid: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    onFormSubmit(event) {
        event.preventDefault();
        console.log('clicked')
        console.log(this.state)
        this.props.history.push('/Main');
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
    }


    render() {
        return (
            <div className="container Login-form" >
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group">
                        <label>Email address:</label>
                        <input type="email" className="form-control" name="email" value={this.state.email} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <button className="btn btn-default">Submit</button>
                </form>
            </div >
        )
    }
}

export default Login;