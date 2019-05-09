import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { register, clearAuthError } from '../actions/auth'

export class RegisterPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            rememberMe: false,
            formErrors: {
                name: 'Please enter a name',
                email: 'Please enter a valid email address',
                password: 'Password is too short',
                passwordConfirm: 'Passwords must match'
            },
            nameValid: false,
            emailValid: false,
            passwordValid: false,
            passwordConfirmValid: false,
            formValid: false,
            showErrors: false
        }
    }

    componentWillUnmount = () => {
        this.props.clearAuthError()
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors
        let nameValid = this.state.nameValid
        let emailValid = this.state.emailValid
        let passwordValid = this.state.passwordValid
        let passwordConfirmValid = this.state.passwordConfirmValid

        switch(fieldName) {
            case 'name':
                nameValid = value.length >= 1
                fieldValidationErrors.name = nameValid ? '' : 'Please enter a name'
                break
            case 'email':
                if (value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                    emailValid = true
                } else {
                    emailValid = false
                }
                fieldValidationErrors.email = emailValid ? '' : 'Please enter a valid email address'
                break
            case 'password':
                passwordValid = value.length >= 6
                fieldValidationErrors.password = passwordValid ? '': 'Password is too short'
                break
            case 'passwordConfirm':
                passwordConfirmValid = value === this.state.password
                fieldValidationErrors.passwordConfirm = passwordConfirmValid ? '' : 'Passwords must match'
                break
            default:
                break
            }
        this.setState({
            formErrors: fieldValidationErrors,
            nameValid,
            emailValid,
            passwordValid,
            passwordConfirmValid
        }, this.validateForm)
    }

    validateForm = () => {
        this.setState({
            formValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid & this.state.passwordConfirmValid
        })
    }

    onChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        this.setState({
            [name]: value
        }, () => { this.validateField(name, value) })
    }

    onCheck = (e) => {
        this.setState({rememberMe: e.target.checked})
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.formValid){
            const name = this.state.name
            const email = this.state.email
            const password = this.state.password
            const rememberMe = this.state.rememberMe
            const creds = { name, email, password, rememberMe}
            this.props.startRegister(creds)
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

    signIn = () => {
        this.props.history.push('/')
    }
    
    render(){
        return (
            <div className='container'>
                <div className='header__login'>
                    <div className='header__content'>
                    <button className='button button__link__dark' onClick={this.signIn}>Sign In</button>
                    <h1 className='page-header__title'>Register</h1>
                    </div>
                </div>
                <form className='form'>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input
                        type='text'
                        name='name'
                        value={this.state.name}
                        className={`text-input ${this.errorClass(this.state.nameValid)}`}
                        onChange={this.onChange}
                    />
                    {(!this.state.nameValid && this.state.showErrors) && (
                        <div className="form__error">
                            {this.state.formErrors.name}
                        </div>
                    )}
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
                    <label htmlFor='passwordConfirm'>
                        Confirm Password
                    </label>
                    <input
                        type='password'
                        name='passwordConfirm'
                        value={this.state.passwordConfirm}
                        className={`text-input ${this.errorClass(this.state.passwordConfirmValid)}`}
                        onChange={this.onChange}
                    />
                    {(!this.state.passwordConfirmValid && this.state.showErrors) && (
                        <div className="form__error">
                            {this.state.formErrors.passwordConfirm}
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
                        <button type='submit' className='button' onClick={this.onSubmit}>Register</button>
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
    startRegister: (creds) => dispatch(register(creds)),
    clearAuthError: () => dispatch(clearAuthError())
})

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(RegisterPage))