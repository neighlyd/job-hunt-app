import moment from 'moment'

export default (jobs, { text, sortBy, startDate, endDate }) => {
    const formattedText = text.trim().toLowerCase()
    return jobs.filter( job => {

        const appliedAtMoment = moment(job.appliedAt)
        const startDateMatch = startDate ? startDate.isSameOrBefore(appliedAtMoment, 'day') : true
        const endDateMatch = endDate ? endDate.isSameOrAfter(appliedAtMoment, 'day') : true
        const textMatch = (
            job.title.toLowerCase().includes(formattedText) 
            || job.company.toLowerCase().includes(formattedText) 
            || job.notes.toLowerCase().includes(formattedText)
        )

        return textMatch && startDateMatch && endDateMatch
    }).sort( (a, b) => {
        if (sortBy === 'Archived') {
            return (a.archived === b.archived) ? 0 : a.archived? 1 : -1
        } else if (sortBy === 'Company') {
            return a.company < b.company ? -1 : 1
        } else if (sortBy === 'Date') {
            return a.appliedAt < b.appliedAt ? 1 : -1
        } else if (sortBy === 'Job') {
            return a.title < b.title ? -1 : 1
        }
    })
}