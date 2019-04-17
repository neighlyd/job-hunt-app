const mongoose = require('mongoose')

const User = require('./user')

const APPLICATION_STAGES = ['Application', 'Recruiter', 'Phone Screen', 'Web Interview', 'Onsite Interview', 'Offer', 'Accepted']

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    company: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    notes: {
        type: String,
        trim: true,
        default: ''
    },
    stage: {
        type: String,
        enum: APPLICATION_STAGES,
        default: 'Application',
        set: function(stage) {
            this._stage = this.stage;
            return stage
        }
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    appliedAt: {
        type: Date,
        default: Date.now()
    },
    archived: {
        type: Boolean,
        default: false,
        set: function(archived) {
            this._archived = this.archived;
            return archived;
        }
    },
}, {
        timestamps: true
})

JobSchema.pre('save', async function (next) {
    let userUpdates = {}
    
    const oldArchived = this._archived
    const oldStage = this._stage
    
    const newStageIndex = APPLICATION_STAGES.indexOf(this.stage)
    const oldStageIndex = APPLICATION_STAGES.indexOf(oldStage)

    if (oldArchived === false && this.archived === true) {
        userUpdates['resiliency'] = 5
    }

    if (this.isNew){
        userUpdates['momentum'] = (newStageIndex + 1) * 5
    } else if (oldStage && (newStageIndex > oldStageIndex)) {
        userUpdates['momentum'] = (newStageIndex - oldStageIndex) * 5
    }

    if (Object.entries(userUpdates).length !== 0){
        await User.findOneAndUpdate({_id: this.applicant}, {$inc: {...userUpdates}})
    }

    next()
})


let Job = mongoose.model('Job', JobSchema)

module.exports = {
    Job,
    APPLICATION_STAGES
}