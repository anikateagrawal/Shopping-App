const express=require('express');
const router=express.Router();
const {isLoggedIn}=require('../middleware');
const User=require('../models/user')
const Product=require('../models/product') 
const Offers=require('../models/offers');

router.get('/user',isLoggedIn,(req,res)=>{
    res.render('user/userInfo');
})

router.post('/products/cart/:pid/add',isLoggedIn,async(req,res)=>{
    const uid=req.user.id;
    const {pid}=req.params;
    const user=await User.findById(uid);
    let i;
    for(i=0;i<user.cart.length;i++){
        if(user.cart[i]==pid){
            user.qty[i]++;
            break; 
        }
    }
    if(i==user.cart.length){
        user.cart.push(pid);
        user.qty.push(1);
    }
    await user.save();
    req.flash('message','product successfully added to cart');
    res.redirect('/products');
})

router.get('/cart',isLoggedIn,async(req,res)=>{
    const user=req.user;
    await user.populate('cart');
    const products=user.cart;
    const offers=await Offers.find();
    res.render('user/cart',{products,offers});
})  

router.delete('/products/cart/:pid',isLoggedIn,async(req,res)=>{
    const uid=req.user.id;
    const {pid}=req.params;
    const user=await User.findById(uid);
    for(let i=0;i<user.cart.length;i++){
        if(user.cart[i]==pid){
            user.qty[i]--;
        }
        if(user.qty[i]==0){
            user.qty.splice(i,1);
            user.cart.splice(i,1);
        }
    }
    await user.save();
    req.flash('error','product removed from cart');
    res.redirect('/cart');
})

router.get('/myproducts',isLoggedIn,async(req,res)=>{
    const products=await Product.find({creator:req.user.id});
    res.render('user/myproducts',{products});
});

router.get('/about',(req,res)=>{
    res.render('user/creator');
})

module.exports=router;
