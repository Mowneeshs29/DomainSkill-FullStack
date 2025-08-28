const express = require("express");
const jwt = require("jsonwebtoken");
const controller1=require("./controller1");
const db = require('./db');

const app = express();

app.use(express.json());

db();


app.get('/getAllStudents',controller1.verifytoken,controller1.allstudents)

app.post('/insert', controller1.verifytoken, controller1.insertdata);

app.post('/login', (req, res) => {
    let {username, password} = req.body;
    if(username == "admin" && password == "admin@123") {
        let token = jwt.sign({username}, "SECRETKEY", {
            expiresIn : '1h'
        });
        res.send(token);
    }
});








 app.get('/getStudentByRollNo',controller1.verifytoken,controller1.byrollNo);
    
   



 app.delete('/deleteStudentByRollNO', controller1.verifytoken, controller1.deletestudent);
   

 app.put('/updateStudent', controller1.verifytoken,controller1.upStudent)
    


app.listen(3000);