const express=require('express');
const { isLoggedIn } = require('../middleware');
const router=express.Router();
const Offers=require('../models/offers');


router.get('/offers',isLoggedIn,async(req,res)=>{
    const offers=await Offers.find();
    res.render('./admin/offer',{offers});
})


router.post('/offer/new',isLoggedIn,async(req,res)=>{
    const {desc,percent}=req.body;
    await Offers.create({desc,percent});
    req.flash('message','Offer added');
    res.redirect('/offers');
})

router.delete('/offer/:id',async(req,res)=>{
    const {id}=req.params;
    await Offers.findByIdAndDelete(id);
    req.flash('message','offer deleted');
    res.redirect('/offers');
})

module.exports=router;