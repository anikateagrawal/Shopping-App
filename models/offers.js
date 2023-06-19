const mongoose=require('mongoose');

const schema=new mongoose.Schema({
    desc:{
        type:String,
        required:true
    },
    percent:{
        type:Number,
        required:true
    }
})

const model=mongoose.model('Offer',schema);

module.exports=model;