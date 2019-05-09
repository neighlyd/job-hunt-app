import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


const APPLICATION_STAGES = [
    'Application', 
    'Recruiter', 
    'Phone Screen', 
    'Web Interview', 
    'Onsite Interview', 
    'Offer', 
    'Accepted'
]


export default class JobItemForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.job ? props.job.title : '',
            company: props.job ? props.job.company : '',
            notes: props.job ? props.job.notes : '',
            stage: props.job ? props.job.stage : 'Application',
            appliedAt: props.job ? moment(props.job.appliedAt) : moment(),
            archived: props.job ? props.job.archived : false,
            calendarFocused: false,
            error: ''
        }
        this.APPLICATION_STAGES = APPLICATION_STAGES
    }

    handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name
        this.setState(() => ({ 
            [name]: value 
        }))
    }

    onNotesChange = (e) => {
        const notes = e.target.value
        this.setState(() => ({notes}))
    }
    
    onDateChange = (appliedAt) => {
        if (appliedAt) {
            this.setState(() => ({appliedAt}))
        }
    }

    onArchiveChange = () => {
        this.setState({archived: !this.state.archived})
    }

    handleStageChange = (e) => {
        const stage = e.value
        this.setState(() => ({stage}))
    }

    onFocusChange = ({ focused }) => {
        this.setState(() => ({
            calendarFocused: focused
        }))
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (!this.state.title || !this.state.company ) {
            this.setState(() => ({ error: 'Please provide a job title and company name'}))
        } else {
            this.setState(() => ({error: ''}))
            this.props.onSubmit({
                title: this.state.title,
                company: this.state.company,
                notes: this.state.notes,
                stage: this.state.stage,
                appliedAt: this.state.appliedAt,
                archived: this.state.archived
            })
        }
    }

    render() {
        return (
            <form className='form' onSubmit={(e) => e.preventDefault()}>
            {this.state.error && <span className='form__error'>{this.state.error}</span>}
                <div className='form__group'>
                    <label htmlFor='title'>
                        Job Title
                    </label>
                    <input
                        type='text'
                        placeholder='Job Title'
                        className='text-input'
                        name='title'
                        autoFocus
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                </div>
                <div className='form__group'>
                    <label htmlFor='company'>
                        Company Name
                    </label>
                    <input
                        type="company"
                        placeholder="Company Name"
                        className="text-input"
                        name='company'
                        value={this.state.company}
                        onChange={this.handleChange}
                    />       
                </div>
                <div className='form__group'>
                    <label htmlFor='stage'>
                        Stage
                    </label>
                    <Dropdown 
                        options={APPLICATION_STAGES} 
                        name='stage' 
                        placeholder='Select a Stage'
                        onChange={this.handleStageChange} 
                        value={this.state.stage}
                    />     
                </div>
                <div className='form__group'>
                    <label htmlFor='appliedAt-Date'>
                        Date Applied 
                    </label>
                    <SingleDatePicker
                        date={this.state.appliedAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calendarFocused}
                        onFocusChange={this.onFocusChange}
                        id="appliedAt-Date"
                        numberOfMonths={1}
                        isOutsideRange={(() => false)}
                        hideKeyboardShortcutsPanel={true}
                    />
                </div>
                <div className='form__group'>
                    <label htmlFor='notes'>
                        Notes
                    </label>
                    <textarea
                        placeholder='Notes to track your job application process (optional)'
                        className='textarea'
                        name='notes'
                        rows='5'
                        value={this.state.notes}
                        onChange={this.handleChange}
                    >
                    </textarea>
                </div>
                <div className='form__button-well'>
                    <button className='button__form' onClick={this.onSubmit}>{this.props.buttonLabel}</button>
                    { this.props.onDelete && 
                        <button className='button__form button__warning' onClick={this.props.onDelete}>Delete</button>
                    }
                    { this.state.archived  ? (
                        <button className='button__form button__archive__true' onClick={this.onArchiveChange}>Archived</button> 
                    ) : (
                        <button className='button__form button__archive' onClick={this.onArchiveChange}>Archive</button>
                    )}
                </div>
            </form>
        )
    }
}