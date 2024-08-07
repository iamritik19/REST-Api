const user=require('../Models/user');
async function getAllUsers(req,res){
       const allUsers=await user.find({});
      return res.status(200).json(allUsers);
}
async function createNewUsers(req,res){
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
    return res.status(201).json({
        "msg":"Successfully created"
    })
}
async function getUserById(req,res){
    const member=await user.findById(req.params.id);
  return  res.send(member);
}
async function updateUserInformation(req,res){
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
   return res.json({
        "msg":"successfully updated the information"
    })
}
async function deleteUser(req,res){
    await user.findByIdAndDelete(req.params.id);
    return res.status(201).json({
        "msg":"successfully deleted"
    })
}
module.exports={
    getAllUsers,
    createNewUsers,
    getUserById,
    updateUserInformation,
    deleteUser,
}