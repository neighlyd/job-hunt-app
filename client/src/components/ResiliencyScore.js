import React from 'react'

import { connect } from 'react-redux'

const ResiliencyScore = ({ resiliency }) => {
    return (
        <div className='starburst__container'>
            <div className="starburst__purple">
                <div className="text"> 
                    <span className="number">{resiliency}</span> 
                    <span className="label">Resiliency</span> 
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    resiliency: state.auth.user.resiliency
})

export default connect(mapStateToProps)(ResiliencyScore)