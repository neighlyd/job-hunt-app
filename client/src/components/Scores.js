import React from 'react'
import { connect } from 'react-redux'

const ScoresPage = ({ user }) => {
    return (
        <div>
            <div className='page-header'>
                <h1 className='page-header__title'>SCORES!</h1>
                </div>
            <div>
                <p>{ user.resiliency }</p>
                <p>{ user.momentum }</p>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(ScoresPage)