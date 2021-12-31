const express = require("express")
const app = express()
const ejs = require("ejs")
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/190110910823');
const userschema = {
    Username: String,
    Password: String,
    Sex: String,
    Type: String
}
const qnschema = {
    Q1: String,
    Q2: String,
    Q3: String,
    Q4: String,
    Q5: String,
}
const User = mongoose.model('user', userschema);
const Qn = mongoose.model('qn', qnschema);

app.use('/', express.static('public'))
app.get('/regist', (req, res) => {
    const user = new User({ Username: req.query.username, Password: req.query.password, Sex: req.query.sex, Type: 'user' });
    user.save(function (err, userInfo) {
        if (err) {
            res.sendFile(__dirname + '/public/regist.html')
        }
        else {
            res.sendFile(__dirname + '/public/login.html')
        }
    })
})
app.get('/login', (req, res) => {
    const Info = { Username: req.query.username, Password: req.query.password, Type: req.query.type };
    User.findOne(Info, function (err, userInfo) {
        if (err) {
            res.sendFile(__dirname + '/public/login.html')
        } else {
            if (userInfo) {
                if(Info.Type=='admin'){
                    res.redirect("./qndetails.html")
                }
                else{
                    res.redirect("./qn.html")
                }    
            } 
            else {
                res.sendFile(__dirname + '/public/login.html')
            }
        }
    })
})
app.get('/qnaction', (req, res) => {
    const qn = new Qn({ Q1:req.query.Q1,Q2:req.query.Q2,Q3:req.query.Q3,Q4:req.query.Q4,Q5:req.query.Q5 });
    qn.save(function (err, userInfo) {
        if (err) {
            res.redirect("./qn.html")
        }
        else {
            res.redirect("./index.html")
        }
    })
})

app.listen(10823)