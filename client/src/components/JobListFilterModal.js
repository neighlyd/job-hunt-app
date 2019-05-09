import React from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { DateRangePicker } from 'react-dates'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

import { 
    setTextFilter, 
    setStartDate, 
    setEndDate, 
    sortByArchived,
    sortByCompany, 
    sortByDate, 
    sortByJob  
} from '../actions/jobFilters'

const SORT_BY_OPTIONS = [
    'Archived',
    'Company',
    'Date',
    'Job'
]

export class JobListFilters extends React.Component {
    state = {
        calendarFocused: null,
    }
    

    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate)
        this.props.setEndDate(endDate)
    }

    onFocusChange = (calendarFocused) => {
        this.setState(() => ({calendarFocused}))
    }

    onTextChange = (e) => {
        this.props.setTextFilter(e.target.value)
    }

    onSortChange = (e) => {
        if (e.value === 'Archived') {
            this.props.sortByArchived()
        } else if (e.value === 'Company') {
            this.props.sortByCompany()
        } else if (e.value === 'Date') {
            this.props.sortByDate()
        } else if (e.value === 'Job') {
            this.props.sortByJob()
        }
    }

    render() {
        return (
            <Modal
                isOpen={!!this.props.showModal}
                className='modal'
                closeTimeoutMS={200}
                contentLabel="Filter Application List"
                onRequestClose={this.props.handleCloseModal}
                appElement={document.querySelector('#root')}
            >       
                <div className='filter-input-group'>
                    <div className='filter-input-group__item'>
                        <input 
                            type='text' 
                            className='text-input'
                            value={this.props.jobFilters.text} 
                            onChange={this.onTextChange}
                            placeholder='Search Jobs'/>
                    </div>
                    <div className='filter-input-group__item'>
                        <label htmlFor='sortBy' className='filter-input-group__label'>
                            Sort By
                        </label>
                        <Dropdown
                            options={SORT_BY_OPTIONS}
                            name='sortBy'
                            value={this.props.jobFilters.sortBy}
                            onChange={this.onSortChange}
                        />
                    </div>
                    <div className='filter-input-group__item'>
                        <DateRangePicker
                            startDate={this.props.jobFilters.startDate}
                            startDateId={this.props.jobFilters.startDate.toString()}
                            endDate={this.props.jobFilters.endDate}
                            endDateId={this.props.jobFilters.endDate.toString()}
                            onDatesChange={this.onDatesChange}
                            focusedInput={this.state.calendarFocused}
                            onFocusChange={this.onFocusChange}
                            numberOfMonths={1}
                            isOutsideRange={(() => false)}
                            showClearDates={true}
                            hideKeyboardShortcutsPanel={true}
                        />
                    </div>
                    <button className='button' onClick={this.props.handleCloseModal}>Done</button>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    jobFilters: state.jobFilters
})

const mapDispatchToProps = (dispatch) => ({
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    sortByArchived: () => dispatch(sortByArchived()),
    sortByCompany: () => dispatch(sortByCompany()),
    sortByDate: () => dispatch(sortByDate()),
    sortByJob: () => dispatch(sortByJob())
})

export default connect(mapStateToProps, mapDispatchToProps)(JobListFilters)