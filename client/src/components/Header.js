import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../actions/auth'

export class Header extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            collapse: false
        }
        this.changePage = this.changePage.bind(this)
        this.logout = this.logout.bind(this)
    }
    
    logout = () => {
        this.props.startLogout(this.props.token)
    }

    changePage = () => {
        this.props.history.push('/')
    }
    
    render() {
        return (
            <header className='header'>
                <div className='container'>
                    <div className='header__content'>
                        <Link to='/' className='header__link'>
                                <h1>Job Hunt</h1>
                        </Link>
                        { this.props.isAuth ? (
                            <button className='button button__link' onClick={ this.logout }>Logout</button>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </header>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: (token) => dispatch(logout(token))
})

const mapStateToProps = (state, props) => ({
    token: state.auth.token,
    isAuth: state.auth.isAuthenticated
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))