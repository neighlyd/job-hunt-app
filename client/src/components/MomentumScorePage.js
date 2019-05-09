import React from 'react'

import { connect } from 'react-redux'

const MomentumScorePage = ({ momentum }) => {
    return (
        <div className='score-card'>
            <h2>{ momentum }</h2>
            <h3>Momentum</h3>
        </div>
    )
}

const mapStateToProps = (state) => ({
    momentum: state.auth.user.momentum
})

export default connect(mapStateToProps)(MomentumScorePage)