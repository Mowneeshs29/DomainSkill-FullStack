const  jwt=require('jsonwebtoken')
const mongoose= require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/studentmanagementdata")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("DB Connection Error:", err));
const studentSchema = new mongoose.Schema({
    name : String,
    age : Number,
    department : String,
    rollNo : String
});

const Student = mongoose.model("Student", studentSchema);

function verifytoken(req, res, next) {
    let token = req.body.token;
        if(!token) return res.send("No token provided");
        jwt.verify(token, "SECRETKEY", (err, decoded) => {
            if(err) {
                console.log(err);
                return res.send("Invalid token");
            }
            console.log(decoded);
            next();
        });

}

async function insertdata(req, res) {
    const { name, age, department, rollNo } = req.body;
    const newStudent = new Student({ name, age, department, rollNo });
    try {
        await newStudent.save();
        res.status(201).send("Student inserted");
    } catch (error) {
        res.status(400).send("Error inserting student");
    }
}

 async function byrollNo  (req, res) {
    try {
        const { rollNo } = req.body;
        const data = await Student.findOne({ rollNo });
        if (data) {
            res.send(data);
        } else {
            res.status(404).send("Student not found");
        }
    }
    catch (error) {
        res.status(500).send("Error fetching students");
    }
 };

  
    
async function allstudents (req, res) {
    try {
        const data = await Student.find();
        res.send(data);
    }
    catch (error) {
        res.status(500).send("Error fetching students");
    }
 };

  async function deletestudent (req, res)  {
    const {rollNo} = req.body;
    try {
        const deletedStudent = await Student.findOneAndDelete({rollNo})
        console.log(deletedStudent, rollNo);

        if(deletedStudent) {
            res.send("Student deleted");
        } else {
            res.status(404).send("Student not found");
        }
    }
    catch(err) {
        res.send("Error in deleting student");
    }
 };

 async function upStudent (req, res)  {
     const { rollNo, name, age, department } = req.body;
     try {
         const updatedStudent = await Student.findOneAndUpdate(
             { rollNo },
             { name, age, department },
             { new: true }
         );
         if (updatedStudent) {
             res.send("Student updated");
         } else {
             res.status(404).send("Student not found");
         }
     } catch (error) {
         res.status(500).send("Error updating student");
     }
 };
module.exports={verifytoken,insertdata,byrollNo,allstudents,deletestudent,upStudent }