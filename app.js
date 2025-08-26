const express = require('express');
const controller = require('./controller')
const mongoose = require("mongoose")
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/trainerdb")
.then(()=>console.log("MongoDB connected"))
.catch(err=> console.log("DB connection error:",err));

app.post('/insert', controller.insertdata);
app.get('/getAllStudents', controller.getAllStudents);
app.get('/getStudentByRollNo', controller.getStudentByRollNo);
app.delete('/deleteStudent', controller.deleteStudent);
app.put('/editStudent',controller.editStudent);
app.get('/paramscheck/:id',(req,res)=>{
    console.log(req.params.id);
    res.send("Params Checked");
})
app.get('/querycheck',(req,res)=>{
    console.log(req.query);
    res.send("QUERY params Checked");
})


app.listen(1000);