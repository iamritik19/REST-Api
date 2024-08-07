const express=require('express');
const port=8000;
const app=express();
const user=require('./Models/user');
const userRouter=require('./routes/user');
const {connectMongoDb}=require('./connection');
//connection
connectMongoDb("mongodb://127.0.0.1:27017/employees");
//plug-ins
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use("/user",userRouter);
app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})