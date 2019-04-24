const request = require('supertest')
const expect = require('expect')
const { ObjectID } = require('mongodb')

const app = require('../server/app')
const { Job } = require('../server/models/job')
const User = require('../server/models/user')
const { jobs, users, setupDatabase } = require('./fixtures/db')

beforeEach(setupDatabase)

describe('POST /jobs', () => {
    it('should create a new job and update user momentum', async () => {
        const token = users[2].tokens[0].token
        const title = 'Test job title'
        const company = 'Test Company'

        const res = await request(app)
            .post('/jobs')
            .set('Authorization', `Bearer ${token}`)
            .send({title, company})
            .expect(200)
        
        expect(res.body.title).toBe(title)
        expect(res.body.company).toBe(company)
        
        const jobs = await Job.find({title})

        expect(jobs.length).toBe(1)
        expect(jobs[0].title).toBe(title)

        const user = await User.findById(users[2]._id)
        expect(user.momentum).toBe(5)
    });

    it('should not create a new job with invalid body data', async () => {
        const token = users[0].tokens[0].token

        await request(app)
            .post('/jobs')
            .set('Authorization', `Bearer ${token}`)
            .send({})
            .expect(400)
        const jobs = await Job.find()
        expect(jobs.length).toBe(3)
    });

    it('should update user\'s momentum and resilience when new job has application stage and archived', async () => {
        const user = users[2]
        const token = user.tokens[0].token
        const data = {
            title: 'Test job title',
            company: 'Test Company',
            archived: true,
            stage: 'Phone Screen'
        }

        const res = await request(app)
            .post('/jobs')
            .set('Authorization', `Bearer ${token}`)
            .send({...data})
            .expect(200)
        
        expect(res.body.title).toBe(data.title)
        expect(res.body.company).toBe(data.company)
        expect(res.body.archived).toBeTruthy()
        
        const jobs = await Job.find({title: data.title})

        expect(jobs.length).toBe(1)
        expect(jobs[0].title).toBe(data.title)

        const userData = await User.findById(users[2]._id)
        expect(userData.momentum).toBe(15)
        expect(userData.resiliency).toBe(5)


    } )
});

describe('GET /jobs', () => {
    it('should get all of a user\'s jobs when no query params', async () => {
        const token = users[1].tokens[0].token;

        const res = await request(app)
            .get('/jobs')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.jobs.length).toBe(2)
    });

    it('should filter user\'s archived jobs with query params', async () => {
        const token = users[1].tokens[0].token

        const res = await request(app)
            .get('/jobs?archived=true')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.jobs.length).toBe(1)
    })

    it('should filter user\'s non-archived jobs  with query params', async () => {
        const token = users[1].tokens[0].token;

        const res = await request(app)
            .get('/jobs?archived=false')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.jobs.length).toBe(1)
    })

    it('should paginate user\'s jobs with query params', async () => {
        const token = users[1].tokens[0].token

        const res = await request(app)
            .get('/jobs?limit=1&skip=1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.jobs.length).toBe(1)
        expect(res.body.jobs[0].title).toBe('Software Dev I')
    })

    it('should sort user\'s jobs with query params', async () => {
        const token = users[1].tokens[0].token

        const res = await request(app)
            .get('/jobs?sortBy=title:desc')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.jobs.length).toBe(2)
        expect(res.body.jobs[0].title).toBe('Software Dev I')
        expect(res.body.jobs[1].title).toBe('Another Job')
    })

    it('should paginate and filter user\'s jobs with query params', async () => {
        const token = users[1].tokens[0].token

        const res = await request(app)
            .get('/jobs?sortBy=title:desc&limit=1&skip=1')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.jobs.length).toBe(1);
        expect(res.body.jobs[0].title).toBe('Another Job')
    })
})

describe('GET /jobs/:id', () => {
   it('should return job doc', async () => {
        const token = users[0].tokens[0].token
        const res = await request(app)
            .get(`/jobs/${jobs[0]._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.job.title).toBe(jobs[0].title)   
   })

   it('should not return job doc created by other user', async () => {
       const token = users[0].tokens[0].token
       await request(app)
            .get(`/jobs/${jobs[1]._id.toString()}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
   })

   it('should return 404 if job not found', async () => {
       const hexID = new ObjectID().toString()
       const token = users[0].tokens[0].token

       await request(app)
            .get(`/jobs/${hexID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
   })

   it('should return 400 for invalid object id', async () => {
       const hexID = new ObjectID().toString()
       const token = users[0].tokens[0].token

       await request(app)
            .get(`/jobs/${hexID}1`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
   })
})

describe('DELETE /jobs/:id', () => {
   it('should remove a job', async () => {
        const token = users[0].tokens[0].token
        const hexId = jobs[0]._id.toString()

        const res = await request(app)
            .delete(`/jobs/${hexId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        expect(res.body.job._id).toBe(hexId);
        const job = await Job.findById(hexId)
        expect(job).toBeFalsy()
   })

   it('should not remove a job from unauthorized user', async () => {
        const token = users[1].tokens[0].token
        const hexId = jobs[0]._id.toString()
        
        await request(app)
            .delete(`/jobs/${hexId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
        const job = await Job.findById(hexId)
        expect(job).toBeTruthy()
   })

   it('should return 404 if job not found', async () => {
        const hexId = new ObjectID()
        const token = users[0].tokens[0].token

        await request(app)
            .delete(`/jobs/${hexId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(404)
   })

   it('should return 400 for invalid object id', async () => {
        const hexID = new ObjectID().toString()
        const token = users[0].tokens[0].token

        await request(app)
            .delete(`/jobs/${hexID}1`)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
   })
})

describe('PATCH /jobs/:id', () => {
    it('should update user\'s own job but not update scores when stage and archive changed', async () => {
        const id = jobs[1]._id
        const token = users[1].tokens[0].token
        const body = {title: 'Updated first test'}
        
        const res = await request(app)
            .patch(`/jobs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200)
        expect(res.body.job.title).toBe(body.title)

        const user = await User.findById(users[1]._id)
        expect(user.momentum).toBe(10)
        expect(user.resiliency).toBe(5)
    })

    it('should update user\'s own job and update scores when stage and archive changed', async () => {
        const id = jobs[1]._id
        const token = users[1].tokens[0].token
        const body = {title: 'Updated first test', stage: 'Recruiter', archived: 'true'}
        
        const res = await request(app)
            .patch(`/jobs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(200)
        expect(res.body.job.title).toBe(body.title)

        const user = await User.findById(users[1]._id)
        expect(user.momentum).toBe(15)
        expect(user.resiliency).toBe(10)
    })

    it('should not let user update job of another user', async () => {
        const id = jobs[0]._id
        const token = users[1].tokens[0].token
        const body = {title: 'Updated first test'}

        await request(app)
            .patch(`/jobs/${id}`)
            .set('Authorization', `Bearer ${token}`)
            .send(body)
            .expect(404)
    })
})