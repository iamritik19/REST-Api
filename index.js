const express=require('express');
const app=express();
const port=8000;
//importing mongoose
const mongoose=require('mongoose');
//connecting establishment with databases
mongoose
.connect('mongodb://127.0.0.1:27017/employees')
.then(()=>{
    console.log("mongo setup done")
})
.catch(err=>{
    console.log("mongo error",err);
})
// Defining Schema
const userSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    gender:{
        type: String,
      required:true,
    },
    jobTitle:{
        type:String,
        required:true,
    }
},{timestamps:true});
//Defining model
const user=mongoose.model('user',userSchema);
//Middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());
//Routes Creation
app.route('/api/users')
.get(async (req,res)=>{
    //get data from mongo server(read)
   const allUsers=await user.find({});
   res.status(200).json(allUsers);
})
.post(async (req,res)=>{
    //collect information for new user and put the data into the database creating a new user(create)
    const body=req.body;
    if(!body || !body.first_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).send("Missing Data");
    }
    await user.create({
        firstName: body.first_name,
        lastName:body.lastName,
        email:body.email,
        gender:body.gender,
        jobTitle:body.job_title
    });
    res.status(201).json({
        "msg":"Successfully created"
    })
});
app.route('/api/users/:id')
.get(async (req,res)=>{
    //access the particular user(read)
const member=await user.findById(req.params.id);
res.send(member);
})
.patch(async (req,res)=>{
    //update the user's information
    const body=req.body;
    if(!body){
     return res.status(400).json({
        "msg":"You have not provided any kind of Information"
      })
    }
    if(body.first_name){
        await user.findByIdAndUpdate(req.params.id,{firstName:body.first_name});
    }
    if(body.last_name){
    await user.findByIdAndUpdate(req.params.id,{lastName:body.last_name})
    }
    if(body.email){
        await user.findByIdAndUpdate(req.params.id,{email:body.email});
    }
    if(body.gender){
        await user.findByIdAndUpdate(req.params.id,{gender:body.gender})
    }
    if(body.job_title){
        await user.findByIdAndUpdate(req.params.id,{jobTitle:body.job_title})
    }
    res.json({
        "msg":"successfully updated the information"
    })
})
.delete(async (req,res)=>{
    //delete the particular user
    await user.findByIdAndDelete(req.params.id);
    res.status(201).json({
        "msg":"successfully deleted"
    })
})
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})