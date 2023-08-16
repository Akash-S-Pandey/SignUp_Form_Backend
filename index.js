const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express()

//using middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


// connecting mongodb

mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.on('error',()  => console.log("Error in connection"));
db.once('open',() =>console.log("Database succesfully connected"));


//creating a  post method in signup

app.post('/sign_up',(req,res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    let data = {
        "name":name,
        "email":email,
        "password":password,
        "phone":phone
    };

    db.collection('users').insertOne(data,(err,Collection)=>{
        if(err){
            throw err;
        }
        console.log("data Inserted sucessfullt");
    })
    return res.redirect("signup_success.html")
})



//created a server
app.get('/',(req,res)=>{

    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect("index.html")
    
}).listen(5000);

console.log(`listening on port http://localhost:5000`)

