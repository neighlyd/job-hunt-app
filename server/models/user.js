const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Job = require('./job')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        minlength: 1,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: val => `${val.value} is not a valid email.`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    zip_code: {
        type: Number,
        trim: true,
        default: null,
        validate: {
            validator: code => code === null || validator.isPostalCode(code.toString(), 'US'),
            message: val => `${val.value} is not a valid zip code`
        }
    },
    resiliency: {
        type: Number,
        default: 0
    },
    momentum: {
        type: Number,
        default: 0
    },
    social: {
        type: Number,
        default: 0
    },
    linkedin: {
        type: String,
        minlength: 5,
        trim: true,
        default: null,
        validate: {
            validator: url => url == null || validator.isURL(url),
            message: val => `${val.value} is not a valid URL.`
        }
    },
    github: {
        type: String,
        minlength: 13,
        trim: true,
        default: null,
        validate: {
            validator: url => url === null || validator.isURL(url),
            message: val => `${val.value} is not a valid URL.`
        }
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

UserSchema.methods.toJSON = function() {
    let user = this
    let userObject = user.toObject()

    delete userObject.admin
    delete userObject.password
    delete userObject.zip_code

    return userObject
    
};

UserSchema.virtual('jobs', {
    ref: 'Job',
    localField: '_id',
    foreignField: 'applicant'
})

UserSchema.methods.generateAuthToken = async function() {
    let user = this
    let token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET, {expiresIn: '2 weeks'}).toString()
    return token
};

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
};

// Hash plaintext password before savings.
UserSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    } 
    next()
});

// Delete user jobs on profile delete
UserSchema.post('remove', async function (next) {
    const user = this
    await Job.deleteMany({applicant: user._id})
    next()
})

let User = mongoose.model('User', UserSchema);

module.exports = User