import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'

export class LoginPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        this.setState(() => ({
            [name]: value
        }))
    }
    
    onSubmit = (e) => {
        const email = this.state.email
        const password = this.state.password
        const creds = { email, password }
        this.props.startLogin(creds)
        this.props.history.push('/')
    }
    
    render(){
        return (
            <div className='container'>
                <h1 className='page-header__title'>Sign in</h1>
                <form className='form'>
                    <label htmlFor='email'>
                        Email
                    </label>
                    <input
                        label="Type your email"
                        icon="envelope"
                        type="email"
                        name="email"
                        className='text-input'
                        error="wrong"
                        success="right"
                        onChange={this.onChange}
                    />
                    <label htmlFor='password'>
                        Password
                    </label>
                    <input
                        label="Type your password"
                        icon="lock"
                        type="password"
                        name="password"
                        className='text-input'
                        onChange={this.onChange}
                    />
                    <div className='form__button-well'>
                        <button className='button' onClick={this.onSubmit}>Login</button>
                    </div>
                </form>      
            </div>
        )
    }
} 

const mapDispatchToProps = (dispatch) => ({
    startLogin: (creds) => dispatch(login(creds))
})

export default connect(null, mapDispatchToProps)(LoginPage)