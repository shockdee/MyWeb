const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/190110910823');
const schema = {
    Username: String,
    Password: String,
    Sex: String,
    Type: String
}
const User = mongoose.model('user', schema);

app.use('/',express.static('public'))
app.get('/regist',(req,res)=>{
    const user = new User({Username:req.query.username,Password:req.query.password,Sex:req.query.sex,Type:'user'});
    user.save(function (err,userInfo){
        if(err){
            res.sendFile(__dirname + '/public/regist.html')
        }
        else{
            res.sendFile(__dirname + '/public/regist.html')
        }
    })
})
app.get('/login',(req,res)=>{
    const user = new User({Username:req.query.username,Password:req.query.password,Type:req.query.type});
    User.findOne(user,function(err,userInfo){
        if(err){
            res.sendFile(__dirname + '/public/login.html')
       }else{
            res.sendFile(__dirname + '/public/index.html') 
       }
    })
})

app.listen(10823)