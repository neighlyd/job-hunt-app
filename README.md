# Job Hunting App
<h2> You are more than your job hunt.</h2>

Job hunting sucks. It is emotionally and physically draining. The process is littered with defeats both large and small, from having your application summarily ignored to dealing with the psychological isolation of spending all day alone. The Job Hunting App is intended to help alleviate these feelings, boost confidence, and motivate you to get the job that you deserve.

*The Job Hunting Application is not currently live. This space will be updated with a URL once it is launched.*

### Table of Contents
- [Job Hunting App](#job-hunting-app)
    - [Table of Contents](#table-of-contents)
- [Description](#description)
  - [Profiles and Jobs](#profiles-and-jobs)
  - [Points](#points)
    - [Momentum](#momentum)
    - [Resiliency](#resiliency)
    - [Social *(pending)*](#social-pending)
- [Installation](#installation)
  - [Requirements](#requirements)
  - [Installing the App](#installing-the-app)
  - [Running the App](#running-the-app)
  - [Tests](#tests)
- [Acknowledgements](#acknowledgements)

# Description

## Profiles and Jobs

The application allows users create profiles, add job applications, and track their progress. Users can filter and sort their job applications, helping them keep track of where they have applied, with whom, and when.

The ability to track job applications is not only useful for future applications, but it can also be invaluable when [filing unemployment claims as well.](https://oui.doleta.gov/unemploy/uifactsheet.asp)

## Points

The Job Hunting App uses [gamification](https://en.wikipedia.org/wiki/Gamification) to turn perceived set-backs into motivation.  As users apply for more jobs and move through the interview process they gain `Momentum` and `Resiliency` points. These points help users visualize the progress that they are making in their job hunt, while also encouraging them to keep pushing forward.

### Momentum

As users gain `Momentum` points as they apply for jobs and move through the interview process. These points show the forward progress that each application represents. `Momentum` points help keep job applicants motivated to keep applying and help them document the successes that they achieve along the way.

### Resiliency

Users receive `Resiliency` points when they archive a job application. Jobs are archived when a user either withdraws themselves from consideration or a company passes on the opportunity to hire them. `Resiliency` points show the applicant how much grit and determination they have, reminding them that they are strong and, well, resilient.

### Social *(pending)*

In future iterations, the Job Hunting App will also track `Social` points. `Social` points are the core of the Job Hunting App and demonstrate its ethos that 'You are more than your job hunt.' 

`Social` points represent the psychological wellbeing and self-care that users show themselves and others. Users will gain `Social` points by completing tasks that do not center on job hunting explicitly, but on self-care and psychological maintenance. You are more than your job hunt.

In addition to self-care, `Social` points will also be designed to encourage networking and facilitate mutual aid. Users will be able to gain `Social` points by helping one another with their resumés, meeting up for work sessions or planning groups, trading skills, sharing job postings, or giving one another endorsements.

# Installation

The Job Hunting app is intended to be accessed through its website, rather than cloned and run locally. This is due to the social aspects of the application. However, you are more than welcome to run the application locally or on your own server. To do so, please follow these instructions.

## Requirements

* Node.js
* git
* Mongodb

## Installing the App
To install the app, use your terminal/command line and do the following.

```bash
git clone https://github.com/neighlyd/job-hunt-app
cd job-hunt-app
node install
mkdir server/config
touch server/config/.env.dev
touch server/config/.env.test
```

You will need to fill the `.env` files with the following information.

```
//.env.dev
PORT=3000
MONGODB_URI="mongodb://localhost:27017/job-hunt-app"
JWT_SECRET="A_SUPER_SECRET_KEY_HERE"
```

```
//.env.test
PORT=3000
MONGODB_URI="mongodb://localhost:27017/job-hunt-app-test"
JWT_SECRET="A_SUPER_SECRET_KEY_HERE"
```

## Running the App

To run the app locally, you must [first start up a Mongodb instance](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/). Then use the following command from terminal/command line.

```bash
npm run dev
```

To deploy the app to Heroku, you need to first set up the [Heroku Command Line Interface(CLI)](https://devcenter.heroku.com/articles/heroku-cli).

Once you have the Heroku CLI set up, use the following commands to deploy to a heroku instance:

```
heroku create <any-title-you-want-here>
git push heroku master
heroku open
```

## Tests

The Job Hunting App comes with a full test suite using the [Jest library.](https://jestjs.io/)

To run tests after installing the application, run the following command from within the application directory.

```bash
npm test
```

# Acknowledgements

Special thanks to [Camille](https://www.linkedin.com/in/cciancanelli/) for helping develop the idea for this application.

As always, big thanks to [Andrew Mead](https://twitter.com/andrew_j_mead?lang=en) for his wonderful courses. They helped lay the foundation of knowledge required for this application.