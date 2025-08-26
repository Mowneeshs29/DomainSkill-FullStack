const express = require('express');
const mongoose = require("mongoose")
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
.then(()=>console.log("MongoDB connected"))
.catch(err=> console.log("DB connection error:",err));

const studentSchema =new mongoose.Schema({
    name:String,
    age : Number,
    department : String,
    rollNo: String
});
const Student = mongoose.model("Student",studentSchema);

app.post('/insert', async(req,res)=>{
    const{name,age,department,rollNo}=req.body;
    
    const newStudent= new Student({name,age,department,rollNo});
    try{
        await newStudent.save();
        res.status(201).send("Student inserted")
    }
    catch(error){
        res.status(400).send("error")
    }
});

app.get('/getAllStudent',async(req,res)=>{
    try{
        const data = await Student.find();
        res.send(data);
    }
    catch(error){
        res.status(500).send("error fetching students")
    }
});

app.get('/getStudentRollNo',async(req,res)=>{
    try{
        const {rollNo}=req.body;
        const data = await Student.findOne({rollNo});
        if(data){
            res.send(data);
        }else{
            res.status(404).send("not found")
        }
    }
    catch(error){
        res.status(500).send("error fetching students")
    }
});
app.delete('/student', async (req, res) => {
    const { rollNo } = req.query;
    try {
        const result = await Student.deleteOne({ rollNo });
        console.log(result.deletedCount, rollNo);

        if (result.deletedCount > 0) {
            res.send(`Student with rollNo ${rollNo} deleted successfully`);
        } else {
            res.status(404).send("Student not found");
        }
    }
    catch (err) {
        res.status(500).send("Error deleting student");
    }
});

app.listen(3000);