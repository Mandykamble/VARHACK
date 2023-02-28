const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const education = require('./educationmodel')
  
// Schema
const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
    	lowercase: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 128
	},
	role: {
		type: String,
		required: true,
		enum: ['recruiter'],
		default: 'recruiter'
	},
	date:{
		type: Date,
		default: Date.now
	},
	// profile_image: {
    //     type: String,
    //     // default: 'default-profile-image.jpg'
	// },
	//recruiter
	phone_number: {
        type: Number
    },

    // bio: {
    //     type: String,
	// },
	// applicant
	// education: {
    //     type: [education.schema]
    // },

    // skills: {
    //     type: [String]
    // },

    // resume: {
    //     type: String
	// },

	// working: {
	// 	type: Boolean,
	// 	default: false
    // }
});

module.exports = User = mongoose.model("User", userSchema);