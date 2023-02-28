
const jwt = require("jsonwebtoken");

const Job= require("../models/job.model.js");

// const cookieParser = require("cookie-parser");
// Body-parser middleware


exports.getemployerprofile = async(req,res,next)=>{
    console.log(req.body)

    try {
        let num=0;
        const newJob= new Job(req.body);
        newJob.workid = num;
        num = num+1;
       
        await newJob.save();
        
        res.status(200).json(newJob)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}


exports.getJobs = async(req,res,next)=>{
    

   
    try {
        
        const Jobs = await Job.find(); 
        
        
        res.status(200).json(Jobs)
    } catch (error) {
        
        res.status(500).json(error)
    }
}


















