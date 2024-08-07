const express=require('express');
const router=express.Router();
const handlers=require('../controllers/user');
router
.route('/')
.get(handlers.getAllUsers)
.post(handlers.createNewUsers);

router
.route('/:id')
.get(handlers.getUserById)
.patch(handlers.updateUserInformation)
.delete(handlers.deleteUser);
module.exports=router;