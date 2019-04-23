import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const APPLICATION_STAGES = ['Application', 'Recruiter', 'Phone Screen', 'Web Interview', 'Onsite Interview', 'Offer', 'Accepted']
const defaultOption = APPLICATION_STAGES[0]

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

    onTitleChange = (e) => {
        const title = e.target.value
        this.setState(() => ({ title }))
    }

    onCompanyChange = (e) => {
        const company = e.target.value
        this.setState(() => ({company}))
    }

    onNotesChange = (e) => {
        const notes = e.target.value
        this.setState(() => ({notes}))
    }
    
    onStageChange = (e) => {
        const stage = e.target.value
        this.setState(() => ({stage}))
    }
    
    onDateChange = (appliedAt) => {
        if (appliedAt) {
            this.setState(() => ({appliedAt}))
        }
    }

    onArchiveChange = () => {
        this.setState({archived: !this.state.archived})
    }

    onStageChange = (e) => {
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
            <form className="form" onSubmit={this.onSubmit} >
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                
                <input
                    name="Archived"
                    type="checkbox"
                    defaultChecked={this.state.archived} 
                    onChange={this.state.onArchiveChange}
                />
                <input
                    type="text"
                    placeholder="Job Title"
                    className="text-input"
                    autoFocus
                    value={this.state.title}
                    onChange={this.onTitleChange}
                />
                
                <input
                    type="company"
                    placeholder="Company Name"
                    className="text-input"
                    autoFocus
                    value={this.state.company}
                    onChange={this.onCompanyChange}
                />             
                
                <Dropdown options={APPLICATION_STAGES} onChange={this.onStageChange} value={this.state.stage} placeholder='Select a Stage'/>
                
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


                <textarea
                    placeholder="Notes to track your job application process (optional)"
                    className="textarea"
                    value={this.state.note}
                    onChange={this.onNoteChange}
                >
                </textarea>

                <div>
                    <button className="button">{this.props.buttonLabel} Job</button>
                </div>
            </form>
        )
    }
}