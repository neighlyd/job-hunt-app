const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { Job } = require('../../server/models/job')
const User = require('../../server/models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const userThreeId = new ObjectID()
const userFourId = new ObjectID()

const users = [{
    _id: userOneId,
    name: 'Dustin',
    email: 'dustin@example.com',
    password: 'hunter21',
    github: 'github.com/neighlyd',
    linkedin: 'linkedin.com/in/neighlyd',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET).toString()
    }, {
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userTwoId,
    name: 'Natasha',
    email: 'natasha@example.com',
    password: 'notSecurePassword',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userThreeId,
    name: 'Admin',
    email: 'admin@example.com',
    password: 'hellaSecure',
    admin: true,
    tokens: [{
        token: jwt.sign({_id: userThreeId}, process.env.JWT_SECRET).toString()
    }]
}, {
    _id: userFourId,
    name: 'UserFour',
    email: 'four@example.com',
    password: 'alwaysSecure'
}]

const jobs = [{
    _id: new ObjectID(),
    title: 'Customer Success Engineer',
    company: 'Textio',
    stage: 'Recruiter',
    archived: 'true',
    applicant: userOneId
}, {
    _id: new ObjectID(),
    title: 'Another Job',
    company: 'Microsoft',
    applicant: userTwoId
}, {
    _id: new ObjectID(),
    title: 'Software Dev I',
    company: 'Facebook',
    archived: 'true',
    applicant: userTwoId
}]

const setupDatabase = async () => {
    await User.deleteMany()
    await Job.deleteMany()

    await new User(users[0]).save()
    await new User(users[1]).save()
    await new User(users[2]).save()
    await new User(users[3]).save()

    await new Job(jobs[0]).save()
    await new Job(jobs[1]).save()
    await new Job(jobs[2]).save()
}

module.exports = { jobs, users, setupDatabase }
