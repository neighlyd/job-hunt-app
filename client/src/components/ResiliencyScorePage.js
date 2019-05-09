import React from 'react'

import { connect } from 'react-redux'

const ResiliencyScorePage = ({ resiliency }) => {
    return (
        <div className='score-card'>
            <h2>{ resiliency }</h2>
            <h3>Resiliency</h3>
        </div>
    )
}

const mapStateToProps = (state) => ({
    resiliency: state.auth.user.resiliency
})

export default connect(mapStateToProps)(ResiliencyScorePage)