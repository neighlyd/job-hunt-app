import React from 'react'
import moment from 'moment'
import { Link} from 'react-router-dom'


const JobListItem = (props) => {

    const archivedToClassName = {
        true: 'list-item list-item__archived',
        false: 'list-item'
    }

    return (
        <div className={archivedToClassName[props.archived]}>
            <Link to={`/edit/${props._id}`} className='list-item__body'>
                <div>
                    <h3 className='list-item__title'>{props.title}</h3>
                    <span className='list-item__sub-title'>{ moment(props.appliedAt).format('MMM Do, YYYY') }</span>
                </div>
                    { props.archived && 
                        <div className='list-item__archived-label'>
                            archived
                        </div>
                    }
                <h3 className='list-item__data'>
                    {props.company}
                </h3>
            </Link>
            { props.notes && 
                <div className='list-item__body list-item__data'>
                    {props.notes}
                </div>
            }
        </div>
    )
}

export default JobListItem