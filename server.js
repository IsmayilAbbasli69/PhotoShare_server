const express=require('express')
const cors=require('cors')
const path=require('path')
const app=express();
const mongoose=require('mongoose');
const model=require('./models/model')
const multer=require('multer')
const bodyParser=require('body-parser');
const { dirname } = require('path');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb+srv://ismayilabbasli:ismayil13@cluster.t3eug65.mongodb.net/?retryWrites=true&w=majority',()=>{

app.use(express.static('uploads'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
console.log("DB connected")

var storage = multer.diskStorage({
    destination: __dirname + '/uploads/',
    filename: function(req, file, cb){
       cb(null,file.originalname);
    }
 });
 
 var upload = multer({
    storage: storage,
    limits:{fileSize: '25mb'},
 }).single('file');



app.post('/uploads',async (req,res)=>{

    await upload(req, res, (err) => {
        console.log("Request ---", req.path);
        console.log("Request file ---",req.file);

        if(!err)
           return res.json({status:'ok',file:req.file})
     });
})

app.get('/uploads/:url',(req,res)=>{
 console.log('Hello')
 res.send(req.params)
})



app.post('/create', async (req,res)=>{
console.log(req.body)
try{
const data=await model.create({
tags:req.body.tags,
url:req.body.url,

    })
   
    return res.json({status:'ok',data:data.body})
}
catch(err){
    console.log(err.message)
return res.json({status:404,error:err.message})

}


})

app.get('/data',async(req,res)=>{
const data=await model.find({});
try{
    return res.json({status:'ok',data:data})
}catch(err){
    return res.json({status:404,error:err.message})
}

})







app.listen(process.env.PORT||5000,()=>{
    console.log(`Connected server`)
})

})


