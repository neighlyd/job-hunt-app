import React from 'react'
import { Link } from 'react-router-dom'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'

import { logout } from '../actions/auth'

export const Header = ({ isAuth, token, changePage, startLogout }) => {
    const logout = () => {
        startLogout(token)
    }

    const loginPage = () => {
        changePage('/login')
    }
    
    return (
        <header className="header">
            <div className="container">
                <div className="header__content">
                    <Link to='/'><h1 onClick={ changePage }>Job Hunt Header</h1></Link>
                </div>
                {isAuth ? <button onClick={ logout }>Logout</button> : <button onClick={ loginPage }>Login</button>}
            </div>       
        </header>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: (token) => dispatch(logout(token)),
    changePage: (url) => dispatch(push(url))
})

const mapStateToProps = (state, props) => ({
    token: state.auth.token,
    isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)