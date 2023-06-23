const express=require('express');
const { isLoggedIn } = require('../middleware');
const user = require('../models/user');
const router=express.Router();

router.post('/order',isLoggedIn,async(req,res)=>{
    const User=await user.findById(req.user.id);
    const {amount,available}=req.body;
    // console.log(req.body);
    User.reward=+available+amount/100;
    User.cart=[];
    User.qty=[];
    await User.save();
    req.flash('message','order placed successfully. Total reward points= '+User.reward);
    res.redirect('/products');
})


module.exports=router;









module.exports=router;