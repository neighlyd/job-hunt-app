const express = require('express')

const { Job, APPLICATION_STAGES } = require('../models/job')
const User = require('../models/user')
const authenticate = require('../middleware/authenticate')
const validateID = require('../middleware/validateID')

const router = new express.Router()

router.post('/jobs', authenticate, async (req, res) => {
    const fields = Object.keys(req.body)
    const allowedFields = ['title', 'company', 'notes', 'stage', 'archived', 'appliedAt']
    const isValidOperation = fields.every(field => allowedFields.includes(field))

    if (!isValidOperation) {
        res.status(400).send({errors: {'fieldError': 'Invalid Fields Submitted'}})
    }
    
    try {
        const job = new Job({...req.body, applicant: req.user._id})
        const doc = await job.save()
        res.send(doc)
    } catch (e) {
        res.status(400).send(e)
    }
})

// GET /jobs?archived=true(false/null)
// GET /jobs?limit=<#>&skip=<#> (pagination)
// GET /jobs?sortBy=appliedAt:asc
// GET /jobs?sortBy=company:asc
router.get('/jobs', authenticate, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.archived) {
        match.archived = req.query.archived === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
    }

    try {
        await req.user.populate({
            path: 'jobs',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send({jobs: req.user.jobs})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/jobs/:id', authenticate, validateID, async (req, res) => {
    try {
        const job = await Job.findOne({
            _id: req.id,
            applicant: req.user._id
        });
        if (!job) {
            return res.sendStatus(404);
        }
        // id found
        res.send({job});
    } catch (e) {
        res.sendStatus(400);
    }
});

router.delete('/jobs/:id', authenticate, validateID, async (req, res) => {
    try {
        const job = await Job.findOneAndDelete({
            _id: req.id,
            applicant: req.user.id
        });

        if(!job){
                return res.sendStatus(404);
            }

        res.send({job});
    } catch (e) {
        res.sendStatus(400);
    }
});

router.patch('/jobs/:id', authenticate, validateID, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'company', 'notes', 'stage', 'appliedAt', 'archived']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates'})
    }
    
    try {
        const job = await Job.findOne({_id: req.id, applicant: req.user.id})

        if (!job) {
            return res.sendStatus(404);
        }
                
        updates.forEach((update) => job[update] = req.body[update])
        await job.save()

        
        res.send({job})
    }catch (e) {
        res.status(400).send(e);
    }
});

module.exports = router