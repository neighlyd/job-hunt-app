import React from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { push } from 'connected-react-router'

export class LoginPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    onEmailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({email}))
    }

    onPasswordChange = (e) => {
        const password = e.target.value
        this.setState(() => ({password}))
    }
    
    onSubmit = (e) => {
        e.preventDefault()
        const email = this.state.email
        const password = this.state.password
        const creds = { email, password }
        this.props.startLogin(creds)
        this.props.push('/')
    }
    
    render(){
        return (
            <div>
                <form>
                    <input type='text' ref='email' className='form-control' placeholder='Email' onChange={this.onEmailChange}/>
                    <input type='password' ref='password' className='form-control' placeholder='Password' onChange={this.onPasswordChange}/>
                    <button onClick={this.onSubmit}>Login</button>
                </form>
            </div>
        )
    }
} 

const mapDispatchToProps = (dispatch) => ({
    startLogin: (creds) => dispatch(login(creds)),
    push: () => dispatch(push('/'))
})

export default connect(null, mapDispatchToProps)(LoginPage)