const express=require('express');
const { isLoggedIn } = require('../middleware');
const user = require('../models/user');
const router=express.Router();

router.post('/order/:total',isLoggedIn,async(req,res)=>{
    const User=await user.findById(req.user.id);
    const {total}=req.params;
    User.reward+=total/100;
    User.cart=[];
    User.qty=[];
    await User.save();
    req.flash('message','order placed successfully. Total reward points= '+User.reward);
    res.redirect('/products');
})


module.exports=router;









module.exports=router;