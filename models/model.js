const mongoose=require('mongoose')

const Photo=new mongoose.Schema({
tags:{type:Array,required:true},
url:{type:String,required:true},

},
{collection:'Photo'}
)
const model=mongoose.model('Photo',Photo)

module.exports=model;
