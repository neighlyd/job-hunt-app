import React from 'react'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import moment from 'moment'


export const JobListItem = ({ changePage, title, company, appliedAt }) => (
    <div onClick={changePage}>
        <p className="list-item__title">{title}</p>
        <span className="list-item__sub-title">{company}</span>
        <p>{ moment(appliedAt).format('MMM Do, YYYY') }</p>
    </div>
)

const mapDispatchToProps = (dispatch, props) => ({
    changePage: () => dispatch(push(`/edit/${props._id}`))
})

export default connect(null,mapDispatchToProps)(JobListItem)