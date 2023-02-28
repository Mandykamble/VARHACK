
const jwt = require("jsonwebtoken");

const Job= require("../models/job.model.js");

// const cookieParser = require("cookie-parser");
// Body-parser middleware


exports.postJob = async(req,res,next)=>{
    // console.log(req.body)

    try {
        let num=0;
        const newJob= new Job(req.body);
        newJob.workid = num;
        num = num+1;
        // const user = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN);   
        // if(
            //     !newScholarship.scheamname ||
    //     !newScholarship.scheamnameDesc ||
    //     !newScholarship.scheamType ||
    //     !newScholarship.FinancialYear ||
    //     !newScholarship.ScheamFor ||
    //     !newScholarship.ScheamAmmount ||
    //     !newScholarship.startDate || 
    //     !newScholarship.endDate
    // ){
        
        //     throw new AppError(300,"input field not provided",404)

        // }
        
        // console.log(newEmployer);
        await newJob.save();
        
        res.status(200).json(newJob)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
        

    
  
   
    

    // res.render("employerprofile")
    // res.redirect('/employerprofile')
}


exports.getJobs = async(req,res,next)=>{
    

    // const employeer = jwt.verify(req.cookies.access_token,process.env.ACCESS_TOKEN)
    // const data1 = employeer.newUser[0].name;
    try {
        
        const Jobs = await Job.find(); 
        // res.render("employerpost")
        
        res.status(200).json(Jobs)
    } catch (error) {
        
        res.status(500).json(error)
    }
}


















