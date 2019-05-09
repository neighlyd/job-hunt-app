import React from 'react'
import { connect } from 'react-redux'

const ScoresPage = ({ user }) => {
    return (
        <div>
            <div className='score-card'>
                <p>{ user.resiliency }</p>
                Resiliency
            </div>
            <div className='score-card'>
                <p>{ user.momentum }</p>
                Momentum
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(ScoresPage)