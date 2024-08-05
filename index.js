const express=require('express');
const app=express();
const port=3000;
//importing mongoose
const mongoose=require('mongoose');
//connecting establishment with databases
mongoose.connect('mongodb://127.0.0.1:27017/employees')
.then(()=>{
    console.log("mongo setup done")
})
.catch(err=>{
    console.log("mongo error",err);
})
app.route('/api/route')
.get((req,res)=>{
    //get data from mongo server(read)
})
.post((req,res)=>{
    //collect information for new user and put the data into the database creating a new user(create)
});
app.route('/api/users/:id')
.get((req,res)=>{
    //access the particular user(read)
})
.patch((req,res)=>{
    //update the user's information
})
.delete((req,res)=>{
    //delete the particular user
})
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})