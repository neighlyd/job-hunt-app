import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { login, clearAuthError } from '../actions/auth'

export class LoginPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            rememberMe: false,
            formErrors: {
                email: 'Please enter a valid email address',
                password: 'Password is too short'
            },
            emailValid: false,
            passwordValid: false,
            formValid: false,
            showErrors: false
        }
    }

    componentWillUnmount = () => {
        this.props.clearAuthError()
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid

        switch(fieldName) {
            case 'email':
                if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                    emailValid = true
                } else {
                    emailValid = false
                }
                fieldValidationErrors.email = emailValid ? '' : 'Please enter a valid email address';
                break
            case 'password':
                passwordValid = value.length >= 6
                fieldValidationErrors.password = passwordValid ? '': 'Password is too short'
                break
            default:
                break
            }
        this.setState({
            formErrors: fieldValidationErrors,
            emailValid,
            passwordValid
        }, this.validateForm)
    }

    validateForm = () => {
        this.setState({
            formValid: this.state.emailValid && this.state.passwordValid
        })
    }

    onChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value)}
        )
    }

    onCheck = (e) => {
        this.setState({ rememberMe: e.target.checked })
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.formValid){
            const email = this.state.email
            const password = this.state.password
            const rememberMe = this.state.rememberMe
            const creds = { email, password, rememberMe }
            this.props.startLogin(creds)
        } else {
            this.setState({showErrors: true})
        }
    }

    errorClass = (error) => {
        if(!error && this.state.showErrors) {
            return 'text-input__error'
        } else {
            return ''
        }
    }

    register = () => {
        this.props.history.push('/register')
    }
    
    render(){
        return (
            <div className='container'>
                <div className='header__login'>
                    <div className='header__content'>
                        <h1 className='page-header__title'>Sign in</h1>
                        <button className='button button__link__dark' onClick={this.register}>Register</button>
                    </div>
                </div>
                <form className='form'>
                    <label htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        value={this.state.email}
                        className={`text-input ${this.errorClass(this.state.emailValid)}`}
                        onChange={this.onChange}
                    />
                    {(!this.state.emailValid && this.state.showErrors) && (
                        <div className="form__error">
                            {this.state.formErrors.email}
                        </div>
                    )}
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        value={this.state.password}
                        className={`text-input ${this.errorClass(this.state.passwordValid)}`}
                        onChange={this.onChange}
                    />
                    {(!this.state.passwordValid && this.state.showErrors) && (
                        <div className="form__error">
                            {this.state.formErrors.password}
                        </div>
                    )}
                    <label>
                        <input type='checkbox' onChange={this.onCheck}/>
                        <span>Remember Me</span>
                    </label>
                    {this.props.authError && (
                        <div className="form__error">
                            {this.props.authError}
                        </div>
                    )}
                    <div className='form__button-well'>
                        <button type='submit' className='button' onClick={this.onSubmit}>Login</button>
                    </div>
                </form>      
            </div>
        )
    }
} 

const mapStatetoProps = (state) => ({
    authError: state.auth.error
})

const mapDispatchToProps = (dispatch) => ({
    startLogin: (creds) => dispatch(login(creds)),
    clearAuthError: () => dispatch(clearAuthError())
})


export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(LoginPage))