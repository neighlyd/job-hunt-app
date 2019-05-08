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
            <Link to={`/edit/${props._id}`} className='link__hidden'>
                <div className='list-item__body'>
                    <div className='list-item__order'>
                        <h3 className='list-item__title'>{props.title}</h3>
                        <span className='list-item__sub-title'>{ moment(props.appliedAt).format('MMM Do, YYYY') }</span>
                        { props.archived && (
                            <span className='list-item__sub-title'><br/><i>(Archived)</i></span>
                        )}
                    </div>
                    <h3 className='list-item__order'>
                        {props.company}
                    </h3>
                </div>
                { props.notes && 
                    <div className='list-item__body list-item__data'>
                    {props.notes}
                    </div>
                }
            </Link>
        </div>
    )
}

export default JobListItem