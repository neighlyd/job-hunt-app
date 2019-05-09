import React from 'react'

import { connect } from 'react-redux'

const MomentumScore = ({ momentum }) => {
    return (
        <div className='starburst__container'>
            <div className="starburst__green">
                <div className="text"> 
                    <span className="number">{ momentum }</span> 
                    <span className="label">Momentum</span> 
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    momentum: state.auth.user.momentum
})

export default connect(mapStateToProps)(MomentumScore)